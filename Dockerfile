FROM node:10
RUN mkdir -p /home/node/luiza-labs/node_modules && chown -R node:node /home/node/luiza-labs
WORKDIR /home/node/luiza-labs
COPY package*.json ./
RUN npm install
COPY . .
COPY --chown=node:node . .
USER node
EXPOSE 3000
CMD [ "npm", "start" ]
