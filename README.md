# Moneyhub Tech Test - Investments and Holdings

At Moneyhub we use microservices to partition and separate the concerns of the codebase. In this exercise we have given you an example `admin` service and some accompanying services to work with. In this case the admin service backs a front end admin tool allowing non-technical staff to interact with data.

A request for a new admin feature has been received

---

## KENAN's SOLUTION AND ANSWERS

### My New Route:

Admin - localhost:8083

- `/generate-report` generate csv report as specified

### Additional Modules Used

In the process of writing the new route, I have used additional modules such as:

- `request-promise`
- `csv-stringify`
- `jest`

### Testing

Only one test suite has been written to do unit testing of the `/generate-report` route in the `admin`` service.

To run the unit testing with jest type: `npm test` in the terminal

Besides, Postman has been extensively used to test the API endpoints.

### Additional Questions:

#### 1. How might you make this service more secure?

- use `https` - implement ssl/tls by using https module in node
- use `helmet` middleware for express - sets various http headers for added security
- rate limiting - a module called `express-rate-limit` could be used
- CORS
- better and more comprehensive error handling
- using a database for a more permanent storage capability
- implementing validation (validating input) - potentially using `joi` or one of many other libraries
- implement Auth (authentication and authorisation) - API keys, token or session authentication, JWT, or even OAuth etc.
- use logging and monitoring

#### 2. How would you make this solution scale to millions of records?

- use database instead of saving data locally on json files. optimise this database for efficiency. Do database sharding if necessary. scale horizontally or vertically (depending on the database type - potentially RDMS - SQL databases would be more preferabble if data needs to be secure and schema is well defined; otherwise for massive amounts of unstrcutured data - NoSQL should be fine). for RDMS use indexing for quick read and have a shadow database for write functionality but without indexing. Consider using ORM.

- Use CDNs for static assets

- Use message brokers for communication between services

- Use a load balancer

- Implement caching (potentially something like Redis)

- Choose a cloud service provider wisely

- Adopt Kubernetes for orchestration and for allowing automation of scaling

#### 3. What else would you have liked to improve given more time?

- Would have separated routes into separate modules and folders to follow SOLID principles and adhere to separation of concerns - this would have made index.js files more readable also.
- Would have introduced database
- Would have done data validation
- Would have done authentication and authorisaiton
- Would have added security measures
- Documentation
- Better commenting
- Better logging, monitoring and error messaging
- Containerisation (docker etc.)
- API user experience and a more thorough design - more thoroughly following RESTful principles
- Automated Testing & CI/CD pipelines

---

## Requirements

- As an admin, I want to be able to generate a CSV report showing the values of all user investment holdings
  - Any new routes should be added to the **admin** service
  - The csv report should be sent to the `/export` route of the **investments** service
  - The investments `/export` route expects the following:
    - content-type as `application/json`
    - JSON object containing the report as csv string, i.e, `{csv: '|User|First Name|...'}`
  - The csv should contain a row for each holding matching the following headers
    |User|First Name|Last Name|Date|Holding|Value|
  - The **Holding** property should be the name of the holding account given by the **financial-companies** service
  - The **Value** property can be calculated by `investmentTotal * investmentPercentage`
  - The new route in the admin service handling the generation of the csv report should return the csv as text with content type `text/csv`
- Ensure use of up to date packages and libraries (the service is known to use deprecated packages but there is no expectation to replace them)
- Make effective use of git

We prefer:

- Functional code
- Ramda.js (this is not a requirement but feel free to investigate)
- Unit testing

### Notes

All of you work should take place inside the `admin` microservice

For the purposes of this task we would assume there are sufficient security middleware, permissions access and PII safe protocols, you do not need to add additional security measures as part of this exercise.

You are free to use any packages that would help with this task

We're interested in how you break down the work and build your solution in a clean, reusable and testable manner rather than seeing a perfect example, try to only spend around _1-2 hours_ working on it

## Deliverables

**Please make sure to update the readme with**:

- Your new routes
- How to run any additional scripts or tests you may have added
- Relating to the task please add answers to the following questions;
  1. How might you make this service more secure?
  2. How would you make this solution scale to millions of records?
  3. What else would you have liked to improve given more time?

On completion email a link to your repository to your contact at Moneyhub and ensure it is publicly accessible.

## Getting Started

Please clone this service and push it to your own github (or other) public repository

To develop against all the services each one will need to be started in each service run

```bash
npm start
or
npm run develop
```

The develop command will run nodemon allowing you to make changes without restarting

The services will try to use ports 8081, 8082 and 8083

Use Postman or any API tool of you choice to trigger your endpoints (this is how we will test your new route).

### Existing routes

We have provided a series of routes

Investments - localhost:8081

- `/investments` get all investments
- `/investments/:id` get an investment record by id
- `/investments/export` expects a csv formatted text input as the body

Financial Companies - localhost:8082

- `/companies` get all companies details
- `/companies/:id` get company by id

Admin - localhost:8083

- `/investments/:id` get an investment record by id
