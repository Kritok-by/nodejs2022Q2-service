FROM node:lts-alpine

WORKDIR /usr/src/app

RUN mkdir -p /opt/app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install

COPY . .

ENV PORT 4000

EXPOSE $PORT

RUN npx prisma generate

#RUN npm run build
#
#CMD [ "node", "dist/main.js" ]

CMD ["npm", "run", "start:dev"]