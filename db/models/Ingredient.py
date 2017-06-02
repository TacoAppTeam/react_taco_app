from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import as_declarative, declarative_base


Base = declarative_base()


# @as_declarative()
class Ingredient(Base):
    __tablename__ = 'Ingredients'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    price = Column(Float)

    def __repr__(self):
        return "<Ingredient(id='%s', name='%s', description='%s', price='%s')>" \
          % (self.id, self.name, self.description, self.price)
