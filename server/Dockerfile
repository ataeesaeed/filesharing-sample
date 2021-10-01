FROM node:16-alpine3.11 AS development

WORKDIR /usr/src/app/server

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

RUN npm run build