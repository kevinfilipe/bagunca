FROM node:latest

RUN useradd --user-group --create-home --shell /bin/false api

ENV USER_API_HOME=/home/api API_PORT=9001

COPY package.json $USER_API_HOME/api/

RUN chown -R api:api $USER_API_HOME/*

User api

WORKDIR $USER_API_HOME/api

RUN npm install 

User root

RUN npm install -g nodemon && npm cache clean

COPY . $HOME/api

RUN chown -R api:api $USER_API_HOME/*

EXPOSE $API_PORT