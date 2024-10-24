FROM node:23-alpine3.19

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm", "run", "start" ]