FROM node:23-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY tsconfig.json ./

RUN npm run build

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
