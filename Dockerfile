FROM node:12-slim

ENV ENVIRONMENT=prod

COPY . .
RUN npm install

CMD [ "npm", "run", "build:prod"]
CMD [ "npm", "run", "start"]

