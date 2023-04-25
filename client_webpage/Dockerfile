# Webserver Dockerfile
FROM node as BUILDER
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx

COPY --from=BUILDER /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf