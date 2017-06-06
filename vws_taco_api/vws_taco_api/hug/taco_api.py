### IMPORTANT!!! THIS FILE IS SCRIPTED!!! DO NOT EDIT!!! ###
import hug

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from vws_taco_api.vws_taco_api.models import *


"""Taco API Module."""
"""To run, execute `hug -f taco_api.py`"""

_engine = create_engine('sqlite:///vws_taco_database/taco.db')


def create_session():
    Session = sessionmaker(bind=_engine)
    session = Session()
    return session


@hug.get()
def event(id: hug.types.number):
    session = create_session()
    result = session.query(Event).get(id)
    return result.as_dict() if result else {}


@hug.post()
def event(body):
    try:
        session = create_session()
        param_id = body.get('id', None)
        existing_event = session.query(Event).get(param_id) if param_id else Event()

        event = session.merge(existing_event)
        event.id = body.get('id', existing_event.id)
        event.user_id = body.get('user_id', existing_event.user_id)
        event.location_id = body.get('location_id', existing_event.location_id)
        event.event_date = body.get('event_date', existing_event.event_date)

        session.commit()    # To prevent lock on the table
        session.add(event)  # Add the new object to the session
        session.flush()     # Commits and flushes
        session.close()
        return 'SUCCESS: Updated the TACOBASE'
    except Exception as Error:
        print(Error)
        print('FAILURE ON TACO EVENT CREATION!!!!')
        raise Error



@hug.get()
def ingredient(id: hug.types.number):
    session = create_session()
    result = session.query(Ingredient).get(id)
    return result.as_dict() if result else {}


@hug.post()
def ingredient(body):
    try:
        session = create_session()
        param_id = body.get('id', None)
        existing_ingredient = session.query(Ingredient).get(param_id) if param_id else Ingredient()

        ingredient = session.merge(existing_ingredient)
        ingredient.id = body.get('id', existing_ingredient.id)
        ingredient.name = body.get('name', existing_ingredient.name)
        ingredient.description = body.get('description', existing_ingredient.description)
        ingredient.price = body.get('price', existing_ingredient.price)

        session.commit()    # To prevent lock on the table
        session.add(ingredient)  # Add the new object to the session
        session.flush()     # Commits and flushes
        session.close()
        return 'SUCCESS: Updated the TACOBASE'
    except Exception as Error:
        print(Error)
        print('FAILURE ON TACO EVENT CREATION!!!!')
        raise Error



@hug.get()
def location(id: hug.types.number):
    session = create_session()
    result = session.query(Location).get(id)
    return result.as_dict() if result else {}


@hug.post()
def location(body):
    try:
        session = create_session()
        param_id = body.get('id', None)
        existing_location = session.query(Location).get(param_id) if param_id else Location()

        location = session.merge(existing_location)
        location.id = body.get('id', existing_location.id)
        location.name = body.get('name', existing_location.name)
        location.street_address = body.get('street_address', existing_location.street_address)
        location.city = body.get('city', existing_location.city)
        location.state = body.get('state', existing_location.state)
        location.zip = body.get('zip', existing_location.zip)
        location.phone_number = body.get('phone_number', existing_location.phone_number)
        location.hours = body.get('hours', existing_location.hours)

        session.commit()    # To prevent lock on the table
        session.add(location)  # Add the new object to the session
        session.flush()     # Commits and flushes
        session.close()
        return 'SUCCESS: Updated the TACOBASE'
    except Exception as Error:
        print(Error)
        print('FAILURE ON TACO EVENT CREATION!!!!')
        raise Error



@hug.get()
def order(id: hug.types.number):
    session = create_session()
    result = session.query(Order).get(id)
    return result.as_dict() if result else {}


@hug.post()
def order(body):
    try:
        session = create_session()
        param_id = body.get('id', None)
        existing_order = session.query(Order).get(param_id) if param_id else Order()

        order = session.merge(existing_order)
        order.id = body.get('id', existing_order.id)
        order.user_id = body.get('user_id', existing_order.user_id)
        order.event_id = body.get('event_id', existing_order.event_id)
        order.payment_amount = body.get('payment_amount', existing_order.payment_amount)
        order.order_amount = body.get('order_amount', existing_order.order_amount)

        session.commit()    # To prevent lock on the table
        session.add(order)  # Add the new object to the session
        session.flush()     # Commits and flushes
        session.close()
        return 'SUCCESS: Updated the TACOBASE'
    except Exception as Error:
        print(Error)
        print('FAILURE ON TACO EVENT CREATION!!!!')
        raise Error



@hug.get()
def taco_ingredient(id: hug.types.number):
    session = create_session()
    result = session.query(Taco_Ingredient).get(id)
    return result.as_dict() if result else {}


@hug.post()
def taco_ingredient(body):
    try:
        session = create_session()
        param_id = body.get('id', None)
        existing_taco_ingredient = session.query(Taco_Ingredient).get(param_id) if param_id else Taco_Ingredient()

        taco_ingredient = session.merge(existing_taco_ingredient)
        taco_ingredient.id = body.get('id', existing_taco_ingredient.id)
        taco_ingredient.order_id = body.get('order_id', existing_taco_ingredient.order_id)
        taco_ingredient.ingredient_id = body.get('ingredient_id', existing_taco_ingredient.ingredient_id)

        session.commit()    # To prevent lock on the table
        session.add(taco_ingredient)  # Add the new object to the session
        session.flush()     # Commits and flushes
        session.close()
        return 'SUCCESS: Updated the TACOBASE'
    except Exception as Error:
        print(Error)
        print('FAILURE ON TACO EVENT CREATION!!!!')
        raise Error



@hug.get()
def taco_order(id: hug.types.number):
    session = create_session()
    result = session.query(Taco_Order).get(id)
    return result.as_dict() if result else {}


@hug.post()
def taco_order(body):
    try:
        session = create_session()
        param_id = body.get('id', None)
        existing_taco_order = session.query(Taco_Order).get(param_id) if param_id else Taco_Order()

        taco_order = session.merge(existing_taco_order)
        taco_order.id = body.get('id', existing_taco_order.id)
        taco_order.order_id = body.get('order_id', existing_taco_order.order_id)
        taco_order.shell_id = body.get('shell_id', existing_taco_order.shell_id)

        session.commit()    # To prevent lock on the table
        session.add(taco_order)  # Add the new object to the session
        session.flush()     # Commits and flushes
        session.close()
        return 'SUCCESS: Updated the TACOBASE'
    except Exception as Error:
        print(Error)
        print('FAILURE ON TACO EVENT CREATION!!!!')
        raise Error



@hug.get()
def taco_shell(id: hug.types.number):
    session = create_session()
    result = session.query(Taco_Shell).get(id)
    return result.as_dict() if result else {}


@hug.post()
def taco_shell(body):
    try:
        session = create_session()
        param_id = body.get('id', None)
        existing_taco_shell = session.query(Taco_Shell).get(param_id) if param_id else Taco_Shell()

        taco_shell = session.merge(existing_taco_shell)
        taco_shell.id = body.get('id', existing_taco_shell.id)
        taco_shell.shell = body.get('shell', existing_taco_shell.shell)

        session.commit()    # To prevent lock on the table
        session.add(taco_shell)  # Add the new object to the session
        session.flush()     # Commits and flushes
        session.close()
        return 'SUCCESS: Updated the TACOBASE'
    except Exception as Error:
        print(Error)
        print('FAILURE ON TACO EVENT CREATION!!!!')
        raise Error



@hug.get()
def user(id: hug.types.number):
    session = create_session()
    result = session.query(User).get(id)
    return result.as_dict() if result else {}


@hug.post()
def user(body):
    try:
        session = create_session()
        param_id = body.get('id', None)
        existing_user = session.query(User).get(param_id) if param_id else User()

        user = session.merge(existing_user)
        user.id = body.get('id', existing_user.id)
        user.first_name = body.get('first_name', existing_user.first_name)
        user.last_name = body.get('last_name', existing_user.last_name)
        user.password = body.get('password', existing_user.password)
        user.email = body.get('email', existing_user.email)

        session.commit()    # To prevent lock on the table
        session.add(user)  # Add the new object to the session
        session.flush()     # Commits and flushes
        session.close()
        return 'SUCCESS: Updated the TACOBASE'
    except Exception as Error:
        print(Error)
        print('FAILURE ON TACO EVENT CREATION!!!!')
        raise Error

