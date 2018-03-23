import db
import hug
import json
import jwt
import scripted_endpoints
import logging

from argon2 import PasswordHasher
from vws_taco_api.vws_taco_api.models import *
from vws_taco_api.vws_taco_api.utils import Auth
from cors import cors_support

logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

"""Taco API Module."""
"""To run, execute `hug -f taco_api.py`"""

auth_hug = Auth.auth_hug
ph = PasswordHasher()


@hug.options(requires=cors_support)
def token_generation():
    return 200


@hug.post(requires=cors_support)
def token_generation(username, password):
    """ Authenticate and return a token"""

    session = db.create_session()
    query = session.query(User).filter(User.email == username).first()

    if not query:
        return {"success": False, "message": "Shouldnt tell you this but you don't exist or something"}

    user = query.as_dict()
    db_pass = user.get('password')
    if (ph.verify(db_pass, password)):
        token = jwt.encode({"email": username, "first_name": user.get("first_name"),
                            "last_name": user.get("last_name")}, Auth.secret_key, algorithm='HS256')
        return {"success": True, "token": token}
    return {"success": False, "message": "Should NOT tell you this, but your password is wrong. Don't taze me bro"}


@hug.extend_api()
def with_other_apis():
    return [scripted_endpoints]

# TODO Add more endpoints, with business logic.
# These can reuse the existing base api, and/or use the models


@auth_hug.get(requires=cors_support)
def events(event_id: hug.types.number=0):
    events = []

    session = db.create_session()
    query = session.query(Event, User, Location)\
        .join(User, Event.user_id == User.email)\
        .join(Location, Event.location_id == Location.id)

    if event_id:
        query = query.filter(Event.id == event_id)

    query_result = query.all()

    if not query_result:
        return []

    for result in query_result:
        d = {}
        event = result[0]
        user = result[1]
        location = result[2]

        d['event'] = event.as_dict()
        d['user'] = user.as_dict()
        d['location'] = location.as_dict()

        events.append(d)

    return events


@auth_hug.get(requires=cors_support)
def ingredients():
    ingredients = []

    session = db.create_session()
    query_result = session.query(Ingredient).all()

    if not query_result:
        return []

    for result in query_result:
        d = {}
        ingredient = result

        d['ingredient'] = ingredient.as_dict()

        ingredients.append(d)

    return ingredients


@auth_hug.get(output=hug.output_format.json, requires=cors_support)
def event_orders(event_id: hug.types.number, user_id: hug.types.text=''):
    orders = []

    session = db.create_session()
    querystr = '''select
                                o.event_id,
                                o.id,
                                taco.id,
                                o.user_id,
                                group_concat(ing.name, ', ')
                    from Orders o
                    join Taco_Order taco on taco.order_id=o.id
                    join Taco_Ingredient ti on taco.id=ti.order_id
                    join Ingredients ing on ing.id=ti.ingredient_id
                    where o.event_id=:event_id group by taco.id'''
    query_result = session.execute(querystr, {"event_id": event_id})

    # if user_id:
    #     query_result.filter(Order.user_id == user_id)

    if not query_result:
        return []

    for result in query_result:
        orders.append({
            "event_id": result[0],
            "order_id": result[1],
            "taco_order_id": result[2],
            "user_id": result[3],
            "ingredient": result[4],
            "ing_price": 0
        })

    return orders


@auth_hug.options(requires=cors_support)
def submit_order():
    return 200


@auth_hug.post(requires=cors_support)
def submit_order(body):
    user_id = body.get('user_id').get('email')
    event_id = body.get('eventId')
    orderList = body.get('orderList')

    respList = []

    try:
        session = db.create_session()

        order = Order()
        new_order = session.merge(order)
        new_order.user_id = user_id
        new_order.event_id = event_id
        new_order.payment_amount = 0
        new_order.order_amount = 0

        session.commit()    # To prevent lock on the table
        session.add(new_order)  # Add the new object to the session
        session.flush()     # Commits and flushes
        order_id = new_order.id
        session.close()

        for taco in orderList:
            session = db.create_session()

            taco_order = Taco_Order()
            new_taco = session.merge(taco_order)
            new_taco.order_id = order_id
            new_taco.shell_id = taco.get('shell_id', '')
            session.commit()
            session.add(new_taco)
            session.flush()
            taco_order_id = new_taco.id
            session.close()

            for ingredient in taco.get('ingredientIDs'):
                session = db.create_session()

                taco_ing = Taco_Ingredient()
                new_ing = session.merge(taco_ing)
                new_ing.order_id = taco_order_id
                new_ing.ingredient_id = ingredient
                session.commit()
                session.add(new_ing)
                session.flush()
                session.close()

                respList.append({
                    "event_id": new_order.event_id,
                    "taco_order_id": taco_order_id,
                    "order_id": order_id,
                    "shell_id": new_taco.shell_id,
                    "ingredient": ingredient,
                    "user_id": user_id
                })

        return respList

    except Exception as Error:
        raise Error


@auth_hug.get(requires=cors_support)
def users():
    users = []

    session = db.create_session()
    query_result = session.query(User).all()

    if not query_result:
        return []

    for result in query_result:
        users.append(result.as_dict())

    return users


@auth_hug.get(requires=cors_support)
def locations():
    locations = []

    session = db.create_session()
    query_result = session.query(Location).all()

    if not query_result:
        return []

    for result in query_result:
        locations.append(result.as_dict())

    return locations


@auth_hug.options(requires=cors_support)
def removeTaco():
    return 200


@auth_hug.post(requires=cors_support)
def removeTaco(body):
    taco_id = body.get('taco_order_id')

    session = db.create_session()
    taco_order = session.query(Taco_Order).filter(Taco_Order.id == taco_id)
    taco_ingredients = session.query(Taco_Ingredient).filter(
        Taco_Ingredient.order_id == taco_id)

    taco_order.delete()
    taco_ingredients.delete()

    session.commit()
    session.flush()

    return
