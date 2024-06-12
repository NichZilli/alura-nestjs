# Base image
FROM node:22-alpine

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN yarn install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN yarn build

# Run prisma create
RUN npx prisma generate

# Run prisma migrate and push
RUN npx prisma migrate
