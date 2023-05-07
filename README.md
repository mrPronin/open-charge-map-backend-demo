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
