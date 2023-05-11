# import-service
Fetches data from Open Charge Map, checks for changes, and updates the MongoDB database when necessary
## Environment variables
This project uses the following environment variables:
| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|MONGO_USERNAME           | contains the username used to authenticate with the MongoDB database            | ""      |
|MONGO_PASSWORD           | contains the password used to authenticate with the MongoDB database            | ""      |
|MONGO_PORT           | defines the port number on which the MongoDB server is running            | ""      |
|MONGO_DB           | specifies the name of the MongoDB database you want to connect to            | ""      |
## Getting started
### Build and run service in docker container
#### Develop
- `docker build -t import-service-image-dev --file Dockerfile.dev .` - build image
- `docker run -p 4000:4000 import-service-image-dev` - create and run container
#### Production
## Getting started
TODO
## Running the build
TODO

[Example](https://github.com/rhappdev/nodejs-template/blob/master/Readme.md)