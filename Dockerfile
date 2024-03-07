# Use Node.js as base image
FROM node:latest AS build

# Set the working directory inside the container
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:latest

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 7070

#COPY nginx.conf /etc/nginx/conf.d/default.conf

# Command to start Nginx server
CMD ["nginx", "-g", "daemon off;"]
