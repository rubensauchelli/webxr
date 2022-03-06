FROM node:12-slim

WORKDIR /usr/src/app

ENV ENVIRONMENT=prod

COPY . .
RUN npm install

CMD [ "npm", "run", "build:prod"]
CMD [ "npm", "run", "start"]

