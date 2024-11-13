# FROM node:16

# WORKDIR /app

# COPY package.json /app/
# RUN npm install

# COPY . /app/

# RUN npm run build

# RUN npm install -g serve
# CMD ["serve", "-s", "build"]

# EXPOSE 3000


FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]