# NodeJS scalable solution with Open Charge Map integration + MongoDB
## DESCRIPTION
## USER STORIES
- **User story 01:** As a project architect, I want Docker images to be built for each service to ensure they can be deployed to a Kubernetes cluster.
- **User story 02:** As a project architect, I want services to be designed for scalability, taking into account potential timeouts and other issues that might impact uptime.
- **User story 03:** As a project architect, I want a /graphql endpoint provided for each service, serving a sub-graph that can be accessed through a federated GraphQL gateway to serve data for several clients.
- **User story 04:** As a project architect, I want data to be stored in a MongoDB database, using UUIDs (v4) instead of the default ObjectIds for internal identification.
- **User story 05:** As a project architect, I want a service that fetches the latest charging station data from Open Charge Map and updates the database only when changes are detected.
- **User story 06:** As a project architect, I want the /graphql endpoint to list all imported charging stations, with relay-style pagination to navigate through the results.
- **User story 07:** As a project architect, I want separate Docker images to be created for the data pulling and the service itself.
- **User story 08:** As a project architect, I want the following fields from Open Charge Map to be imported:
    - operatorInfo,
    - statusType,
    - addressInfo, 
    - connections.
- **User story 09:** As a project architect, I want a single command to run the entire service and import process locally, along with instructions and a docker-compose file for the additional local infrastructure.
- **User story 10:** (Bonus) As a project architect, I want a minimum of 50% unit test coverage and at least one end-to-end test for the solution.

## ASSUMPTIONS
- use monorepo for all components
- to demonstrate how the project works, it is enough to have docker images for all components and a docker-compose file, there is no need to create Kubernetes config
- to synchronize with OCM, I use the undocumented modifiedsince parameter to fulfill the requirement to receive only the delta of updated data from OCM
- use Apollo Server to support subgraphs
- authentication and user management out of the scope of implementation

## TODO
- [x] define user stories
- [x] create list of questions to the requirements
- [x] analyze the questions
- [x] create list of assumptions
- [x] create git repository and initial README.MD with user stories
- [x] investigate Open Charge Map API: https://openchargemap.org/site/develop/api#/
- [x] prepare a list of questions to the requirements
- [x] R&D federated GraphQL gateway
- [ ] import-service
    - [x] initial project setup for import-service
    - [x] boilerplate import-service with Apollo Server
    - [x] define import-service GraphQL schema and mock response
    - [x] implement 'dev' script, add ts-node-dev
    - [x] setup linter and formatter
    - [ ] implement MongoDB integration
        - [x] define mongoose schema for ImportSession
    - [ ] refactor project
        - [x] refactor: import-service, extract type definition to separate schema.graphql file
        - [x] refactor: import-service, extract resolvers from index.ts
    - [x] define port from PORT environment variable 
    - [ ] define cors configuration
    - [ ] create Dockerfile for import-service
        - [ ] implement port-mapping
    - [ ] adjust import-service to work as a subgraph
    - [ ] etc
- [ ] db
    - [ ] etc
- [ ] client-api
    - [ ] etc
- [ ] graph-router
    - [ ] create Dockerfile for graph-router
    - [ ] etc

