FROM node:16.18

WORKDIR /usr/src/app

COPY package*.json ./ 

RUN npm ci --only=production

EXPOSE 8080

USER node

CMD ["node", "index.js"]
