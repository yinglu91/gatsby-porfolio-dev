# build state for building frontend assets

FROM node:alpine AS builder

WORKDIR /app

COPY package.json yarn.lock .

RUN yarn global add gatsby-cli

# RUN yarn install
RUN apk add --no-cache git
RUN yarn install

# # Optionally, copy your .env file to the container filesystem
COPY .env* .

COPY ./ ./

RUN yarn run build

#docker run -d -p 8000:8000 --name store yinglu91/portfolio:1.0

# nginx state for serving content

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]

# you test local by
  # yarn run build
  # yarn run serve

#yarn reset
#docker image prune
#docker build -t yinglu91/portfolio:1.0 .
#docker images | grep yinglu91
#docker run -p 80809:80 -d yinglu91/portfolio:1.0
#docker ps | grep yinglu91
#curl -i localhost:80809
# Open your browser at http://localhost:80809

#https://shift.infinite.red/npm-vs-yarn-cheat-sheet-8755b092e5cc
#https://dev.to/paveli/running-gatsbyjs-app-in-docker-container-4ed2

# You need to add the following paths to PATH:

# C:\Program Files\Git\bin
# C:\Program Files\Git\cmd

// https://yinglu91-porfolio.netlify.app/