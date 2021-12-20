FROM node:latest

WORKDIR /src

COPY src ./src
COPY package.json ./
COPY tsconfig.json ./

RUN yarn install

EXPOSE 3000

CMD "yarn typeorm migration:run"
CMD [ "yarn", "start" ]
