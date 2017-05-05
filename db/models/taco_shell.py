from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import as_declarative, declarative_base


Base = declarative_base()


# @as_declarative()
class Taco_Shell(Base):
    __tablename__ = 'Taco_Shell'

    id = Column(Integer, primary_key=True, autoincrement=True)
    shell = Column(Integer)

    def __repr__(self):
        return "<Taco(id='%s', shell='%s')>" % (self.id, self.shell)
