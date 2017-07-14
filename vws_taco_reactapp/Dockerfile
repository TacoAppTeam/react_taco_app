FROM node:8
MAINTAINER "Taco Team" tacos@viasat.com

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

COPY package.json  $HOME/tacoapp/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/tacoapp
RUN npm install

USER root
COPY . $HOME/tacoapp
RUN chown -R app:app $HOME/*
USER app

EXPOSE 3000

CMD ["npm", "start"]