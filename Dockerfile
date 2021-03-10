FROM node:12.18.1

ENV NODE_ENV=production

WORKDIR /app/src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "node", "index.js" ]


