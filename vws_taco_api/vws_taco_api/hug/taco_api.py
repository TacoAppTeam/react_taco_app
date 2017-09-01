import db
import hug
import scripted_endpoints

from cors import cors_support
from vws_taco_api.vws_taco_api.models import *

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
                          .join(User, Event.user_id == User.id)\
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
