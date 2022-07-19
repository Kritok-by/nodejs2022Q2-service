# FROM node:lts as build
# USER 259319778
# WORKDIR /opt/app
# COPY package*.json tsconfig.build.json tsconfig.json nest-cli.json ./
# RUN npm install

# FROM node:lts-alpine
# USER 259319778
# COPY --from=build /opt/app /
# EXPOSE ${PORT}
# CMD [ "npm", "run", "start:dev"]


FROM node:lts-alpine

WORKDIR /opt/app

COPY package*.json ./

# COPY prisma ./prisma/

RUN npm install

COPY . .

ENV PORT 4000

EXPOSE $PORT

# RUN npx prisma generate

RUN npm run build

CMD [ "node", "dist/main.js" ]