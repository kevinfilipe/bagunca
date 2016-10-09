FROM node:latest

COPY package.json /node-api/

WORKDIR /node-api

RUN npm install

RUN npm install -g nodemon

COPY app/ /node-api/app/

COPY server.js /node-api/

ENV NODE_PORT 9001

EXPOSE 9001