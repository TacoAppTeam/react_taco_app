from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import as_declarative, declarative_base


Base = declarative_base()


# @as_declarative()
class Location(Base):
    __tablename__ = 'Locations'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    street_address = Column(String)
    city = Column(String)
    state = Column(String)
    zip = Column(String)
    phone_number = Column(Integer)
    hours = Column(String)

    def __repr__(self):
        return "<Location(id='%s', name='%s', street_address='%s', city='%s', state='%s', zip='%s', phone_number='%s', hours='%s')>" \
          % (self.id, self.name, self.street_address, self.city, self.state, self.zip, self.phone_number, self.hours)
