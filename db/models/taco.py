from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import as_declarative, declarative_base


Base = declarative_base()


# @as_declarative()
class Taco(Base):
    __tablename__ = 'taco'

    id = Column(Integer, primary_key=True)
    shell_type = Column(String)

    def __repr__(self):
        return "<Taco(id='%s', shell_type='%s')>" % (self.id, self.shell_type)
