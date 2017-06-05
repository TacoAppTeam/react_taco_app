import sqlite3
import re

from flask import Flask
from contextlib import closing

DATABASE = './taco.db'
DEBUG = True

app = Flask(__name__)
app.config.from_object(__name__)


def init_db():
    print('INITIALIZING DATABASE --- ALL DATA IS BEING OVERWRITTEN')
    with closing(connect_db()) as db:
        with app.open_resource('taco.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()


def init_models():
    print('INITIALIZING DATA MODELS --- ALL CURRENT FILES ARE BEING OVERWRITTEN')
    with closing(connect_db()) as db:
        cursor = db.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sql_%';")
        result = cursor.fetchall()
        table_names = sorted(next(zip(*result)))

        for table_name in table_names:
            # TODO identify model file to be written -- Table_name.py
            # Open file
            model_name = table_name.title()
            if model_name[-1] == 's':
                model_name = model_name[:-1]
            print("Creating %s.py" % model_name)
            target = open("../vws_taco_api/models/" + model_name + '.py', 'w')
            # Truncate file
            target.truncate()
            # Write header ==>
            target.write("# SCRIPTED FILE --- DO NOT MODIFY\n")
            target.write("from sqlalchemy import Column\n")
            target.write("from sqlalchemy.types import *\n")
            target.write("from sqlalchemy.ext.declarative import declarative_base\n")
            target.write("\n")
            target.write("Base = declarative_base()\n")
            target.write("\n")
            target.write("\n")
            target.write("class %s(Base):\n" % model_name)
            target.write("    __tablename__ = '%s'\n" % table_name)
            target.write("\n")

            repr_string_0 = "\n\n    def __repr__(self):\n"
            repr_string_1 = "        return '<%s(" % model_name
            repr_string_2 = ")>'\\\n"
            repr_string_3 = "            % ("
            repr_string_4 = ")\n"

            result = cursor.execute("PRAGMA table_info('%s')" % table_name).fetchall()

            for column in result:
                column_name = column[1]
                column_type = column[2]
                column_nullable = column[3]
                column_default_value = column[4]
                column_is_pk = column[5]
                target.write(
                        ("    %s = Column(%s, nullable=%s, " +
                        "default=%s, primary_key=%s, autoincrement=%s)\n") %
                        (
                            column_name,
                            column_type.upper(),
                            bool(column_nullable),
                            column_default_value,
                            bool(column_is_pk),
                            bool(column_is_pk)
                        )
                    )

                repr_string_1 += ("%s = %%s," % column_name)
                repr_string_3 += ("self.%s," % column_name)

            target.write(repr_string_0 + repr_string_1)
            target.write(repr_string_2 + repr_string_3 + repr_string_4)
            target.write("\n\n")
            target.write("    def as_dict(self):\n")
            target.write("        return {c.name: getattr(self, c.name) for c in self.__table__.columns}\n")
            target.close()

def connect_db():
    return sqlite3.connect(app.config['DATABASE'])

if __name__ == '__main__':
    init_db()
