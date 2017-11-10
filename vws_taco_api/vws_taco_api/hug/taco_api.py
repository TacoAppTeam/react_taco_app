import db
import hug
import json
import scripted_endpoints

from cors import cors_support
from vws_taco_api.vws_taco_api.models import *

import logging

logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

"""Taco API Module."""
"""To run, execute `hug -f taco_api.py`"""


@hug.extend_api()
def with_other_apis():
    return [scripted_endpoints]

# TODO Add more endpoints, with business logic.
# These can reuse the existing base api, and/or use the models


@hug.get(requires=cors_support)
def events():
    events = []

    session = db.create_session()
    query_result = session.query(Event, User, Location)\
                          .join(User, Event.user_id == User.email)\
                          .join(Location, Event.location_id == Location.id)\
                          .all()

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


@hug.get(requires=cors_support)
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


@hug.get(requires=cors_support,output=hug.output_format.json)
def event_orders(event_id: hug.types.number, user_id=None):
    orders = []

    session = db.create_session()
    query_result = session.query(Order, Taco_Order, Taco_Ingredient, Ingredient)\
                          .join(Taco_Order, Order.id == Taco_Order.order_id)\
                          .join(Taco_Ingredient, Taco_Order.id == Taco_Ingredient.order_id)\
                          .join(Ingredient, Taco_Ingredient.ingredient_id == Ingredient.id)\
                          .filter(Order.event_id == event_id)
    if user_id:
        query_result.filter(Order.user_id == user_id)

    if not query_result:
        return []

    for result in query_result:
        order = result[0].as_dict()
        taco_order = result[1].as_dict()
        taco_ing = result[2].as_dict()
        ing = result[3].as_dict()
        orders.append({
            "event_id": order.get("event_id"),
            "order_id": order.get("id"),
            "taco_order_id": taco_order.get("id"),
            "user_id": order.get("user_id"),
            "ingredient": ing.get("name"),
            "ing_price": ing.get("price")
        })

    return orders


@hug.options(requires=cors_support)
def submit_order():
    print('calling them options')
    return 200


@hug.post(requires=cors_support)
def submit_order(body):
    user_id = body.get('user_id')
    event = body.get('event')
    orderList = body.get('orderList')

    try:
        session = db.create_session()

        order = Order()
        new_order = session.merge(order)
        new_order.user_id = user_id
        new_order.event_id = event.get('id')
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

        return 'Updated! %s ' % new_order.id

    except Exception as Error:
        print(Error)
        print('FAILURE ON TACO ORDER SUBMISSION!!!!')
        raise Error


@hug.get(requires=cors_support)
def users():
    users = []

    session = db.create_session()
    query_result = session.query(User).all()

    if not query_result:
        return []

    for result in query_result:
        users.append(result.as_dict())

    return users


@hug.get(requires=cors_support)
def locations():
    locations = []

    session = db.create_session()
    query_result = session.query(Location).all()

    if not query_result:
        return []

    for result in query_result:
        locations.append(result.as_dict())

    return locations
