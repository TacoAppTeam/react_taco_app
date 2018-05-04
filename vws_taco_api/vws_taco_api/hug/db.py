import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

db_path = os.environ.get('DB_PATH', 'sqlite:///vws_taco_database/taco.db')
_engine = create_engine(db_path)


def create_session():
    Session = sessionmaker(bind=_engine)
    session = Session()
    return session
