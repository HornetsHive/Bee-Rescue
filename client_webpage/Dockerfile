# Webserver Dockerfile
FROM node:alpine as BUILDER
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine as RUNNER

COPY --from=BUILDER /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf