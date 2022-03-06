FROM node:12-slim

ENV ENVIRONMENT=prod

WORKDIR /app

COPY . .
RUN npm install

CMD [ "npm", "run", "build:prod"]
CMD [ "npm", "run", "start"]

