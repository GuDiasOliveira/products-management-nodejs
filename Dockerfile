FROM node:8.10.0
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
#RUN chmod +x ./wait-for-it.sh
CMD ["npm", "start"]
