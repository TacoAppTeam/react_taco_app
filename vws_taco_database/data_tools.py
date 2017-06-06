import sqlite3
import re

from flask import Flask
from contextlib import closing

DATABASE = './taco.db'
DEBUG = True

app = Flask(__name__)
app.config.from_object(__name__)


def map_table_names(tbl):
    new_nm = tbl.title()
    if new_nm[-1] == 's':
        new_nm = new_nm[:-1]
    return new_nm


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
        table_data = {}
        for table_name in table_names:
            result = cursor.execute("PRAGMA table_info('%s')" % table_name).fetchall()
            table_data[table_name] = []
            for column in result:
                table_data[table_name].append({
                    "column_name": column[1],
                    "column_type": column[2],
                    "column_nullable": column[3],
                    "column_default_value": column[4],
                    "column_is_pk": column[5],
                })

        create_init_py(table_names)
        create_models_py(table_data)
        create_hug_api(table_data)


def create_init_py(table_names):
    table_names = list(map(map_table_names, table_names))
    init_py_import_str = "\n".join("from ." + nm + " import " + nm for nm in table_names)
    init_target = open("../vws_taco_api/vws_taco_api/models/__init__.py", "w")
    init_target.write(init_py_import_str)
    init_target.close()


def create_models_py(table_data):
    for table in table_data:
        table_info = table_data[table]
        model_name = map_table_names(table)

        print("Creating %s.py" % model_name)
        target = open("../vws_taco_api/vws_taco_api/models/" + model_name + '.py', 'w')

        # Clear old file
        target.truncate()

        target.write("# SCRIPTED FILE --- DO NOT MODIFY\n")
        target.write("from sqlalchemy import Column\n")
        target.write("from sqlalchemy.types import *\n")
        target.write("from sqlalchemy.ext.declarative import declarative_base\n")
        target.write("\n")
        target.write("Base = declarative_base()\n")
        target.write("\n")
        target.write("\n")
        target.write("class %s(Base):\n" % model_name)
        target.write("    __tablename__ = '%s'\n" % table)
        target.write("\n")

        repr_string_0 = "\n\n    def __repr__(self):\n"
        repr_string_1 = "        return '<%s(" % model_name
        repr_string_2 = ")>'\\\n"
        repr_string_3 = "            % ("
        repr_string_4 = ")\n"

        for column in table_info:
            target.write(
                    ("    %s = Column(%s, nullable=%s, " +
                    "default=%s, primary_key=%s, autoincrement=%s)\n") %
                    (
                        column.get("column_name"),
                        column.get("column_type").upper(),
                        bool(column.get("column_nullable")),
                        column.get("column_default_value"),
                        bool(column.get("column_is_pk")),
                        bool(column.get("column_is_pk"))
                    )
                )

            repr_string_1 += ("%s = %%s," % column.get("column_name"))
            repr_string_3 += ("self.%s," % column.get("column_name"))

        target.write(repr_string_0 + repr_string_1)
        target.write(repr_string_2 + repr_string_3 + repr_string_4)
        target.write("\n\n")
        target.write("    def as_dict(self):\n")
        target.write("        return {c.name: getattr(self, c.name) for c in self.__table__.columns}\n")
        target.close()


def create_hug_api(table_data):
    print("Creating taco.api.py!")
    target = open("../vws_taco_api/vws_taco_api/hug/taco_api.py", "w")

    target.write("### IMPORTANT!!! THIS FILE IS SCRIPTED!!! DO NOT EDIT!!! ###\n")
    target.write("import hug\n\n")
    target.write("from sqlalchemy import create_engine\n")
    target.write("from sqlalchemy.orm import sessionmaker\n")
    target.write("from vws_taco_api.vws_taco_api.models import *\n")
    target.write("\n")
    target.write("\n")
    target.write("\"\"\"Taco API Module.\"\"\"\n")
    target.write("\"\"\"To run, execute `hug -f taco_api.py`\"\"\"\n")
    target.write("\n")
    target.write("_engine = create_engine('sqlite:///vws_taco_database/taco.db')\n")
    target.write("\n")
    target.write("\n")
    target.write("def create_session():\n")
    target.write("    Session = sessionmaker(bind=_engine)\n")
    target.write("    session = Session()\n")
    target.write("    return session\n")

    for table in table_data:
        table_info = table_data[table]
        model_name = table.title()
        if model_name[-1] == 's':
            model_name = model_name[:-1]

        # Create get endpoint
        target.write("\n")
        target.write("\n")
        target.write("@hug.get()\n")
        target.write("def %s(id: hug.types.number):\n" % model_name.lower())
        target.write("    session = create_session()\n")
        target.write("    result = session.query(%s).get(id)\n" % model_name)
        target.write("    return result.as_dict() if result else {}\n")

        # Create post endpoint
        target.write("\n")
        target.write("\n")
        target.write("@hug.post()\n")
        target.write("def %s(body):\n" % model_name.lower())
        target.write("    try:\n")
        target.write("        session = create_session()\n")
        target.write("        param_id = body.get('id', None)\n")
        target.write("        existing_%s = session.query(%s).get(param_id) if param_id else %s()\n" % (model_name.lower(), model_name, model_name))
        target.write("\n")
        target.write("        %s = session.merge(existing_%s)\n" % (model_name.lower(), model_name.lower()))
        for column in table_info:
            name = column.get("column_name")
            target.write("        %s.%s = body.get('%s', existing_%s.%s)\n" % (model_name.lower(), name, name, model_name.lower(), name))

        target.write("\n")
        target.write("        session.commit()    # To prevent lock on the table\n")
        target.write("        session.add(%s)  # Add the new object to the session\n" % model_name.lower())
        target.write("        session.flush()     # Commits and flushes\n")
        target.write("        session.close()\n")
        target.write("        return 'SUCCESS: Updated the TACOBASE'\n")
        target.write("    except Exception as Error:\n")
        target.write("        print(Error)\n")
        target.write("        print('FAILURE ON TACO EVENT CREATION!!!!')\n")
        target.write("        raise Error\n")
        target.write("\n")
    target.close()

def connect_db():
    return sqlite3.connect(app.config['DATABASE'])

if __name__ == '__main__':
    init_db()
