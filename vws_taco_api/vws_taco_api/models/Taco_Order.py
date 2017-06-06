# SCRIPTED FILE --- DO NOT MODIFY
from sqlalchemy import Column
from sqlalchemy.types import *
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Taco_Order(Base):
    __tablename__ = 'Taco_Order'

    id = Column(INTEGER, nullable=False, default=None, primary_key=True, autoincrement=True)
    order_id = Column(INTEGER, nullable=True, default=None, primary_key=False, autoincrement=False)
    shell_id = Column(INTEGER, nullable=True, default=None, primary_key=False, autoincrement=False)


    def __repr__(self):
        return '<Taco_Order(id = %s,order_id = %s,shell_id = %s,)>'\
            % (self.id,self.order_id,self.shell_id,)


    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
