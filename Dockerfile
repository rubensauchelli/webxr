FROM node:12-slim

ENV ENVIRONMENT=prod

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build:prod

CMD [ "npm", "run", "start"]

