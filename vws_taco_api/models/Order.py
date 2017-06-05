# SCRIPTED FILE --- DO NOT MODIFY
from sqlalchemy import Column
from sqlalchemy.types import *
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Order(Base):
    __tablename__ = 'Orders'

    id = Column(INTEGER, nullable=False, default=None, primary_key=True, autoincrement=True)
    user_id = Column(INTEGER, nullable=True, default=None, primary_key=False, autoincrement=False)
    event_id = Column(INTEGER, nullable=True, default=None, primary_key=False, autoincrement=False)
    payment_amount = Column(DECIMAL(10,2), nullable=True, default=None, primary_key=False, autoincrement=False)
    order_amount = Column(DECIMAL(10,2), nullable=True, default=None, primary_key=False, autoincrement=False)


    def __repr__(self):
        return '<Order(id = %s,user_id = %s,event_id = %s,payment_amount = %s,order_amount = %s,)>'\
            % (self.id,self.user_id,self.event_id,self.payment_amount,self.order_amount,)


    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
