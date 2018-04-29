FROM node:8
MAINTAINER "Taco Team" tacos@viasat.com

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]