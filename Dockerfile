FROM node:10.16.0-alpine

RUN mkdir -p /usr/src/demo-app
WORKDIR /usr/src/demo-app

COPY package*.json ./

RUN npm install

COPY public/ public/
COPY config/ config/
COPY scripts/ scripts/
COPY src/ src/

COPY .env* ./

EXPOSE $PORT

CMD ["npm", "start"]