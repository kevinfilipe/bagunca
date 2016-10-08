FROM node:latest

COPY package.json /app/node/

WORKDIR /app/node

RUN npm install

COPY app/ /app/node/app/

COPY server.js /app/node/

ENV NODE_PORT 9001

EXPOSE 9001