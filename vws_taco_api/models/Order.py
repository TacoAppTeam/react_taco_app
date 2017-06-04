from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import as_declarative, declarative_base


Base = declarative_base()


# @as_declarative()
class Order(Base):
    __tablename__ = 'Orders'

    id = Column(Integer, primary_key=True)
    user_id = Column(String)
    event_id = Column(String)
    payment_amount = Column(Float)
    order_amount = Column(Float)

    def __repr__(self):
        return "<Order(id='%s', user_id='%s', event_id='%s', payment_amount='%s', order_amount='%s')>" \
          % (self.id, self.user_id, self.event_id, self.payment_amount, self.order_amount)
