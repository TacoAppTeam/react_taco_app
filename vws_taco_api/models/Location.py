# SCRIPTED FILE --- DO NOT MODIFY
from sqlalchemy import Column
from sqlalchemy.types import *
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Location(Base):
    __tablename__ = 'Locations'

    id = Column(INTEGER, nullable=False, default=None, primary_key=True, autoincrement=True)
    name = Column(TEXT, nullable=True, default=None, primary_key=False, autoincrement=False)
    street_address = Column(TEXT, nullable=True, default=None, primary_key=False, autoincrement=False)
    city = Column(TEXT, nullable=True, default=None, primary_key=False, autoincrement=False)
    state = Column(TEXT, nullable=True, default=None, primary_key=False, autoincrement=False)
    zip = Column(TEXT, nullable=True, default=None, primary_key=False, autoincrement=False)
    phone_number = Column(INTEGER, nullable=True, default=None, primary_key=False, autoincrement=False)
    hours = Column(TEXT, nullable=True, default=None, primary_key=False, autoincrement=False)


    def __repr__(self):
        return '<Location(id = %s,name = %s,street_address = %s,city = %s,state = %s,zip = %s,phone_number = %s,hours = %s,)>'\
            % (self.id,self.name,self.street_address,self.city,self.state,self.zip,self.phone_number,self.hours,)


    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
