FROM node:23-alpine

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm install -g npm && npm install

EXPOSE 3000

CMD [ "npm", "start" ]
