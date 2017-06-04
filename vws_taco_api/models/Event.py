from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import as_declarative, declarative_base


Base = declarative_base()


# @as_declarative()
class Event(Base):
    __tablename__ = 'Events'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    location_id = Column(Integer)
    event_date = Column(String)

    def __repr__(self):
        return "<Event(id='%s', user_id='%s', location_id='%s', event_date='%s')>" \
          % (self.id, self.user_id, self.location_id, self.event_date)
