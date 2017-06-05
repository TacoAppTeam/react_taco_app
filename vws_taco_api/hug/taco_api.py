import hug
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models import Event

"""Taco API Module."""
"""To run, execute `hug -f taco_api.py`"""

_engine = create_engine("sqlite:///../vws_taco_database/taco.db")


def create_session():
    Session = sessionmaker(bind=_engine)
    session = Session()
    return session


@hug.get()
def event(id: hug.types.number):
    session = create_session()
    result = session.query(Event.Event).get(id)
    return result.as_dict() if result else {}


@hug.post()
def event(body):
    try:
        session = create_session()
        param_id = body.get("id", None)
        existing_event = session.query(Event.Event).get(param_id) if param_id else Event.Event()

        event = session.merge(existing_event)
        event.user_id = body.get("user_id", existing_event.user_id)
        event.location_id = body.get("location_id", existing_event.location_id)
        event.event_date = body.get("event_date", existing_event.event_date)

        session.commit()    # To prevent lock on the table
        session.add(event)  # Add the new object to the session
        session.flush()     # Commits and flushes
        session.close()
        return "SUCCESS: Updated the TACOBASE"
    except Exception as Error:
        print(Error)
        print("FAILURE ON TACO EVENT CREATION!!!!")
