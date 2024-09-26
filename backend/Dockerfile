FROM node:22-alpine
WORKDIR /backend
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
HEALTHCHECK CMD curl --fail http://localhost:4000 || exit 1
CMD ["node", "server.js"]
