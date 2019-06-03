# Dockerfile for dev
FROM node:latest
EXPOSE 80
WORKDIR /bindmount
COPY ./ ./
RUN npm install --no-progress --ignore-optional
CMD npm run start