FROM node:12.16.1

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /app/dist/ng-docker-example /usr/share/ngnix/html