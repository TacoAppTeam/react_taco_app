# SCRIPTED FILE --- DO NOT MODIFY
from sqlalchemy import Column
from sqlalchemy.types import *
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = 'Users'

    email = Column(TEXT, nullable=False, default=None, primary_key=True, autoincrement=False)
    first_name = Column(TEXT, nullable=True, default=None, primary_key=False, autoincrement=False)
    last_name = Column(TEXT, nullable=True, default=None, primary_key=False, autoincrement=False)
    password = Column(TEXT, nullable=True, default=None, primary_key=False, autoincrement=False)


    def __repr__(self):
        return '<User(email = %s,first_name = %s,last_name = %s,password = %s,)>'\
            % (self.email,self.first_name,self.last_name,self.password,)


    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
