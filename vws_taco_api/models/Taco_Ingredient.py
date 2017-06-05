# SCRIPTED FILE --- DO NOT MODIFY
from sqlalchemy import Column
from sqlalchemy.types import *
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Taco_Ingredient(Base):
    __tablename__ = 'Taco_Ingredient'

    id = Column(INTEGER, nullable=False, default=None, primary_key=True, autoincrement=True)
    order_id = Column(INTEGER, nullable=True, default=None, primary_key=False, autoincrement=False)
    ingredient_id = Column(INTEGER, nullable=True, default=None, primary_key=False, autoincrement=False)


    def __repr__(self):
        return '<Taco_Ingredient(id = %s,order_id = %s,ingredient_id = %s,)>'\
            % (self.id,self.order_id,self.ingredient_id,)


    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
