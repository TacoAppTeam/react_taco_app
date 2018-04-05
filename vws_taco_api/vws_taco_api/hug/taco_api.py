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
    try:
        if (ph.verify(db_pass, password)):
            token = jwt.encode({"email": username, "first_name": user.get("first_name"),
                                "last_name": user.get("last_name")}, Auth.secret_key, algorithm='HS256')
            return {"success": True, "token": token}
        else:
            return {"success": False, "message": "FAIL"}
    except Exception as Error:
        return {"success": False, "message": "Failure to authenticate - try again or dont or whatever. \n Error: %s " % Error}
    finally:
        pass

    return {"success": False, "message": "Should NOT tell you this, but your password is wrong. Don't taze me bro"}


@hug.options(requires=cors_support)
def create_user():
    return 200


@hug.post(requires=cors_support)
def create_user(email, first_name, last_name, password):
    """ Create a new user """

    session = db.create_session()
    query = session.query(User).filter(User.email == email).first()

    if query:
        return {"success": False, "message": "There already is a you."}

    if not email or not first_name or not last_name or not password:
        return {"success": False, "message": "You need more stuff"}
    new_hash = ph.hash(password)
    scripted_endpoints.user(
        {"email": email, "first_name": first_name,
         "last_name": last_name, "password": new_hash}
    )
    return {"success": True, "message": "Added user, go login fool"}


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
def ingredients(event_id):
    ingredients = []

    session = db.create_session()
    querystr = '''SELECT ing.* 
        FROM ingredients ing 
        JOIN locations loc ON loc.id = ing.location_id
        JOIN events ev ON ev.location_id = loc.id 
        WHERE ev.id = :event_id'''
    query_result = session.execute(querystr, {"event_id": event_id})

    if not query_result:
        return ingredients

    for result in query_result:
        ingredients.append({
            "id": result[0],
            "name": result[1],
            "description": result[2],
            "price": result[3]
        })

    return ingredients


@auth_hug.get(output=hug.output_format.json, requires=cors_support)
def event_orders(event_id: hug.types.number, user_id: hug.types.text=''):
    orders_list = []

    session = db.create_session()

    orders = session.query(Order).filter(Order.event_id == event_id)
    if user_id:
        orders.filter(Order.user_id == user_id)

    for order in orders:
        enriched_order = order.as_dict()

        enriched_order["taco_orders"] = []

        querystr = '''select
                                taco.id,
                                group_concat(ing.name, ', ')
                    from Taco_Order taco
                    join Taco_Ingredient ti on taco.id=ti.order_id
                    join Ingredients ing on ing.id=ti.ingredient_id
                    where taco.order_id=:taco_order_id group by taco.id'''

        query_result = session.execute(
            querystr, {"taco_order_id": enriched_order["id"]})
        for result in query_result:
            enriched_order["taco_orders"].append({
                "taco_id": result[0],
                "ingredient_desc": result[1]
            })

        orders_list.append(enriched_order)

    return orders_list


@auth_hug.options(requires=cors_support)
def delete_event():
    return 200


@auth_hug.post(requires=cors_support)
def delete_event(body):
    event_id = body.get('eventId')

    session = db.create_session()
    orders_querystr = '''select taco.id 
                        from Orders o 
                        join Taco_Order taco on taco.order_id=o.id 
                        join Taco_Ingredient ti on taco.id=ti.order_id 
                        join Ingredients ing on ing.id=ti.ingredient_id 
                        where o.event_id=:event_id group by taco.id'''
    query_result = session.execute(orders_querystr, {"event_id": event_id})

    orders = []
    for result in query_result:
        orders.append(result[0])

    session.commit()
    session.flush()
    session.close()

    # delete each taco order and its ingredients
    for order in orders:
        removeTaco({'taco_order_id': order})

    # delete the event
    session = db.create_session()
    event = session.query(Event).filter(Event.id == event_id)
    event.delete()
    session.commit()
    session.flush()
    session.close()


@auth_hug.options(requires=cors_support)
def submit_order():
    return 200


@auth_hug.post(requires=cors_support)
def submit_order(body):
    user_id = body.get('user_id').get('email')
    event_id = body.get('eventId')
    orderList = body.get('orderList')

    respList = []

    if not user_id or not event_id or not orderList or len(orderList) == 0:
        return {"success": False, "message": "You are missing taco stuff of some sort"}

    try:
        session = db.create_session()
        order = session.query(Order).filter(
            Order.user_id == user_id, Order.event_id == event_id).first()
        if not order:
            temp_order = Order()
            order = session.merge(temp_order)

        order.user_id = user_id
        order.event_id = event_id
        order.payment_amount = order.payment_amount if order.payment_amount else 0
        order.order_amount = order.order_amount if order.order_amount else 0

        session.commit()    # To prevent lock on the table
        session.add(order)  # Add the new object to the session
        session.flush()     # Commits and flushes
        order_id = order.id

        for taco in orderList:
            taco_order = Taco_Order()
            new_taco = session.merge(taco_order)
            new_taco.order_id = order_id
            new_taco.shell_id = taco.get('shell_id', '')
            session.commit()
            session.add(new_taco)
            session.flush()
            taco_order_id = new_taco.id

            for ingredient in taco.get('ingredientIDs'):
                taco_ing = Taco_Ingredient()
                new_ing = session.merge(taco_ing)
                new_ing.order_id = taco_order_id
                new_ing.ingredient_id = ingredient
                session.commit()
                session.add(new_ing)
                session.flush()

                respList.append({
                    "event_id": order.event_id,
                    "taco_order_id": taco_order_id,
                    "order_id": order_id,
                    "shell_id": new_taco.shell_id,
                    "ingredient": ingredient,
                    "user_id": user_id
                })

        update_order = session.merge(order)
        session.add(update_order)  # Add the new object to the session
        session.commit()
        session.flush()     # Commits and flushes
        session.close()

        calculate_order_cost(order_id)

        return {"success": True, "data": respList}

    except Exception as Error:
        return {"success": False, "message": "Server error trying to add the order: %s" % Error}


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
    order_id = taco_order.first().as_dict()["order_id"]
    taco_ingredients = session.query(Taco_Ingredient).filter(
        Taco_Ingredient.order_id == taco_id)

    taco_order.delete()
    taco_ingredients.delete()

    session.commit()
    session.flush()
    session.close()

    calculate_order_cost(order_id)

    return


def calculate_order_cost(order_id):
    session = db.create_session()

    order = session.query(Order).get(order_id)
    order_data = order.as_dict()

    location_ingredients = ingredients(event_id=order_data["event_id"])
    event_data = session.query(Event).get(order_data["event_id"]).as_dict()
    location_data = session.query(Location).get(
        event_data["location_id"]).as_dict()

    order_cost = 0

    taco_orders = session.query(Taco_Order).filter(
        Taco_Order.order_id == order_id)
    for taco_order in taco_orders:
        order_cost = float(order_cost) + \
            float(location_data["base_taco_price"])

        taco_ings = session.query(Taco_Ingredient).filter(
            Taco_Ingredient.order_id == order_id)
        for taco_ing in taco_ings:
            for ing in location_ingredients:
                if taco_ing.id == ing["id"]:
                    order_cost = float(order_cost) + float(ing["price"])

    order.order_amount = order_cost
    session.add(order)
    session.commit()
    session.flush()
    session.close()
