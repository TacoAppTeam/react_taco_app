# SCRIPTED FILE --- DO NOT MODIFY
from sqlalchemy import Column
from sqlalchemy.types import *
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Event(Base):
    __tablename__ = 'Events'

    id = Column(INTEGER, nullable=False, default=None, primary_key=True, autoincrement=True)
    user_id = Column(INTEGER, nullable=True, default=None, primary_key=False, autoincrement=False)
    location_id = Column(INTEGER, nullable=True, default=None, primary_key=False, autoincrement=False)
    event_date = Column(TEXT, nullable=True, default=None, primary_key=False, autoincrement=False)


    def __repr__(self):
        return '<Event(id = %s,user_id = %s,location_id = %s,event_date = %s,)>'\
            % (self.id,self.user_id,self.location_id,self.event_date,)


    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
