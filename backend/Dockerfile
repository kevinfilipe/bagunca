FROM node:latest

RUN useradd --user-group --create-home --shell /bin/false api

ENV NODE_API_HOME=/home/api NODE_API_PORT=9001

COPY package.json $NODE_API_HOME/api/

RUN chown -R api:api $NODE_API_HOME/*

User api

WORKDIR $NODE_API_HOME/api

RUN npm install 

User root

RUN npm install -g nodemon && npm cache clean

COPY . $HOME/api

RUN chown -R api:api $NODE_API_HOME/*

EXPOSE $NODE_API_PORT