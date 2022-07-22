FROM node:lts as build
WORKDIR /opt/app
COPY package*.json tsconfig.build.json tsconfig.json nest-cli.json ./
RUN npm install

FROM node:lts-alpine
COPY --from=build /opt/app /
EXPOSE ${PORT}
CMD [ "npm", "run", "start:dev"]
