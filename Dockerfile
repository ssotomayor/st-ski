FROM node:10.15.3-alpine
EXPOSE 8080
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --no-progress --ignore-optional
COPY . .
CMD npm run start