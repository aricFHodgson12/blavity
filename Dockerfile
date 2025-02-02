FROM node:11
MAINTAINER Blavity Inc engineering@blavity.com
WORKDIR /app
COPY . .
RUN npm cache clean --force && \ 
    rm -rf node_modules && \
    npm install && \
    npm run build
CMD ["npm","run","start"]
EXPOSE 3000
