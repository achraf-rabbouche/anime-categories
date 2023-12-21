FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 5002

CMD ["node", "server.js"]
