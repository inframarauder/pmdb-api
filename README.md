# Public Movie Database (API)

This is an open source movie database that can be used to retrieve data about various movies.
It is a demo Node.js,Express and MongoDB REST API, built with the purpose of:

- demonstrating how to build a REST API using the above techonologies
- demonstrating programming best practices and organizing code in a very maintainable manner
- serving as a mock backend for anyone who is venturing out to learn a new frontend framework

Concepts Covered:

- Basic CRUD operations using Express and Mongoose
- Server side validation using Joi
- Error handling
- User authentication
- Protecting routes
- Mongoose middleware (pre-hook)
- Mongoose schema level methods

### Documentation

This is a very simple REST API that demonstrates basic CRUD operations and user authentication.
There are two schemas - User and Movie and the following endpoints :

- User

  1. POST /api/auth/signup
  2. POST /api/auth/login

- Movie
  1. GET /api/movies
  2. GET /api/movies/:id
  3. POST /api/movies (protected)
  4. PUT /api/movies/:id(protected)
  5. DELETE /api/movies/:id(protected)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/a98fce008746b6ea2d69#?env%5Blocalhost%5D=W3sia2V5IjoiYmFzZVVybCIsInZhbHVlIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJqd3QiLCJ2YWx1ZSI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpmYVdRaU9pSTFaV0kwTnpabFlqazFaV014TVRkbE56QTJZVFJpT1RjaUxDSnBZWFFpT2pFMU9EZzRPRFV6TVRsOS5NR1ViNm9KRC1LeUZ0ZElISXpuVmlONlhkZl9UYjU3QUZaSGE3Wmw0SEdVIiwiZW5hYmxlZCI6dHJ1ZX1d)

Run the postman collection for detailed documentation of the requests and responses.

** _'protected'_ routes are accessible only by authenticated users. Such requests must bear a special header named _'x-auth-token'_ which should carry the JWT received on successful authentication **

Go ahead and use this as a REST API backend for your frontend projects. Also, feature requests and PRs are welcome :)
