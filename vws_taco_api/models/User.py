# SCRIPTED FILE --- DO NOT MODIFY
from sqlalchemy import Column
from sqlalchemy.types import *
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = 'Users'

    id = Column(INTEGER, nullable=False, default=None, primary_key=True, autoincrement=True)
    first_name = Column(TEXT, nullable=True, default=None, primary_key=False, autoincrement=False)
    last_name = Column(TEXT, nullable=True, default=None, primary_key=False, autoincrement=False)
    password = Column(TEXT, nullable=True, default=None, primary_key=False, autoincrement=False)
    email = Column(TEXT, nullable=True, default=None, primary_key=False, autoincrement=False)


    def __repr__(self):
        return '<User(id = %s,first_name = %s,last_name = %s,password = %s,email = %s,)>'\
            % (self.id,self.first_name,self.last_name,self.password,self.email,)


    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
