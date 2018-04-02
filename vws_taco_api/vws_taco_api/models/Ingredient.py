# SCRIPTED FILE --- DO NOT MODIFY
from sqlalchemy import Column
from sqlalchemy.types import *
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Ingredient(Base):
    __tablename__ = 'Ingredients'

    id = Column(INTEGER, nullable=False, default=None, primary_key=True, autoincrement=True)
    name = Column(TEXT, nullable=True, default=None, primary_key=False, autoincrement=False)
    description = Column(TEXT, nullable=False, default=None, primary_key=False, autoincrement=False)
    price = Column(DECIMAL(5,2), nullable=True, default=None, primary_key=False, autoincrement=False)
    location_id = Column(INTEGER, nullable=True, default=None, primary_key=False, autoincrement=False)


    def __repr__(self):
        return '<Ingredient(id = %s,name = %s,description = %s,price = %s,location_id = %s,)>'\
            % (self.id,self.name,self.description,self.price,self.location_id,)


    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
