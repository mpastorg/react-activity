# build stage
FROM node:10-alpine as build-pre-stage

RUN mkdir /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

# production stage
FROM nginx:1.17.1-alpine

COPY --from=build-pre-stage /app/build /usr/share/nginx/html/
EXPOSE 8079
CMD ["nginx", "-g", "daemon off;"]
