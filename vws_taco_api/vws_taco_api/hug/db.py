from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

_engine = create_engine('sqlite:///vws_taco_database/taco.db')


def create_session():
    Session = sessionmaker(bind=_engine)
    session = Session()
    return session
