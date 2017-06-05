# SCRIPTED FILE --- DO NOT MODIFY
from sqlalchemy import Column
from sqlalchemy.types import *
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Taco_Shell(Base):
    __tablename__ = 'Taco_Shell'

    id = Column(INTEGER, nullable=False, default=None, primary_key=True, autoincrement=True)
    shell = Column(TEXT, nullable=True, default=None, primary_key=False, autoincrement=False)


    def __repr__(self):
        return '<Taco_Shell(id = %s,shell = %s,)>'\
            % (self.id,self.shell,)


    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
