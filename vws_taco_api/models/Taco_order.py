from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import as_declarative, declarative_base


Base = declarative_base()


# @as_declarative()
class Taco_Order(Base):
    __tablename__ = 'Taco_Order'

    id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer)
    shell_id = Column(Integer)

    def __repr__(self):
        return "<Taco(id='%s', order_id='%s', shell_id='%s')>" % (self.id, self.order_id, self.shell_id)
