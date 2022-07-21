FROM node:lts-alpine

WORKDIR /opt/app

COPY package*.json ./
COPY prisma ./prisma/

RUN yarn install

COPY . .

ENV PORT 4000

EXPOSE $PORT

RUN yarn build
RUN npx prisma generate

CMD [ "node", "dist/main.js" ]