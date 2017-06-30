from sqlalchemy import MetaData, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from Event import Event


def create_session():
    engine = create_engine("sqlite:///taco.db")
    Session = sessionmaker(bind=engine)
    session = Session()

    return engine, session


def main():
    engine, session = create_session()
    event_query = session.query(Event).order_by(Event.id)
    print(event_query)
    for event in event_query:
        print(event)


if __name__ == "__main__":
    main()
