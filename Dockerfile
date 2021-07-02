# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:14 as builder

ENV NODE_ENV production

# Set the working directory
WORKDIR /app

COPY package.json yarn.lock ./

#!/bin/sh

# Install all the dependencies
RUN yarn global add @angular/cli@latest

RUN yarn install

ENV PATH="./node_modules/.bin:$PATH"

# Add the source code to app
COPY . .

# if you have libraries in your workspace that the angular app relies on, build them here

# build your application
RUN yarn build:prod

# STAGE 2
# Deploy APP

# In this stage, we are going to take the build artefacts from stage one and build a deployment docker image
# We are using nginx:alpine as the base image of our deployment image
FROM nginx:alpine

COPY --from=builder /app/dist/angular-base-project /usr/share/nginx/html

# Expose port 80
EXPOSE 80
