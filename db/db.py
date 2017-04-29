from sqlalchemy import Column, Integer, String
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


def create_session():
    engine = create_engine("sqlite:///taco.db")
    Session = sessionmaker(bind=engine)
    session = Session()

    return session


Base = declarative_base()


class Test(Base):
    __tablename__ = 'test'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    type = Column(String)

    def __repr__(self):
        return "<Test(id='%s', name='%s', type='%s')>" % (self.id, self.name, self.type)


def main():
    session = create_session()

    for test in session.query(Test).order_by(Test.id):
        print(test)


if __name__ == "__main__":
    main()
