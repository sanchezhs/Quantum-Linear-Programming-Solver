FROM node:14.17.3

WORKDIR /frontend

COPY package.json package-lock.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
