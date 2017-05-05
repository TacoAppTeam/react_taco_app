from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import as_declarative, declarative_base


Base = declarative_base()


# @as_declarative()
class User(Base):
    __tablename__ = 'Users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String)
    last_name = Column(String)
    password = Column(String)
    email = Column(String)

    def __repr__(self):
        return "<Taco(id='%s', first_name='%s', last_name='%s', password='%s', email='%s')>" % (self.id, self.first_name, self.last_name, self.password, self.email)
