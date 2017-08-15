import hug
import scripted_endpoints

from vws_taco_api.vws_taco_api.models import *

"""Taco API Module."""
"""To run, execute `hug -f taco_api.py`"""


@hug.extend_api()
def with_other_apis():
    return [scripted_endpoints]


# TODO Add more endpoints, with business logic.
# These can reuse the existing base api, and/or use the models
import json

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


def cors_support(response, *args, **kwargs):
    response.set_header('Access-Control-Allow-Origin', '*')


_engine = create_engine('sqlite:///vws_taco_database/taco.db')


def create_session():
    Session = sessionmaker(bind=_engine)
    session = Session()
    return session


@hug.get(requires=cors_support)
def events():
    events = []

    session = create_session()
    query_result = session.query(Event)\
                          .all()

    if not query_result:
        return []

    for result in query_result:
        events.append(result.as_dict())

    return events
