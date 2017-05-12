from sqlalchemy import MetaData, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from models.taco import Taco


def create_session():
    engine = create_engine("sqlite:///taco.db")
    Session = sessionmaker(bind=engine)
    session = Session()

    return engine, session


def create_tables(engine):
    tables = ['taco']

    for table in tables:
        if not engine.dialect.has_table(engine, table):  # If table don't exist, Create.
            metadata = MetaData(engine)

            # Implement the creation
            metadata.create_all()


def main():
    engine, session = create_session()

    # Base = declarative_base()
    # Base.metadata.create_all(engine)
    create_tables(engine)

    for taco in session.query(Taco).order_by(Taco.id):
        print(taco)


if __name__ == "__main__":
    main()
