FROM node:alpine
WORKDIR /microservice
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm install
RUN npm install nodemon
EXPOSE 3001
CMD ["npm", "start"]