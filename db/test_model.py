from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Test(Base):
    __tablename__ = 'test'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    type = Column(String)

    def __repr__(self):
       return "<Test(name='%s', type='%s')>" % (
                            self.name, self.type)
