From node:docker

WORKDIR /dev

COPY package.json ./dev

RUN npm install

COPY . .

CMD ["nodemon", "myfirstAPI.js"]