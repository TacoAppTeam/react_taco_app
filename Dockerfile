FROM python:3.6.5

RUN apt-get update && apt-get install -y sqlite3
ADD ./vws_taco_api/requirements.txt /
ADD ./vws_taco_database/taco.sql /
RUN sqlite3 taco.db < taco.sql

RUN pip install -r requirements.txt

ENV DB_PATH=sqlite:///taco.db

ADD ./vws_taco_api/vws_taco_api /vws_taco_api/vws_taco_api 

ENTRYPOINT [ "hug", "-f", "/vws_taco_api/vws_taco_api/hug/taco_api.py" ]

