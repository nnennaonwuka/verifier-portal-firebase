FROM node:14.14.0-alpine3.12 as common-build-stage

#Create app directory
WORKDIR /app

#Copy NPM packages
COPY package*.json ./

#Install app dependencies
RUN npm install
#If you are building your code for production
#RUN npm ci --only=prduction

#Bundle app source
COPY . .

EXPOSE 3000

# Development build stage
FROM common-build-stage as development-build-stage

ENV NODE_ENV development

CMD ["npm", "run", "start"]

