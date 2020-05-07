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
To run the app, you must have Node.js and MongoDB installed

- Clone the repo
- Open a terminal window inside the project directory
- run the command `npm install`
- create a file called `.env` at the root of the project directory
- add the following environment variables in the file:
  ```
   DB_URI=<your_mongo_connection_string>
   JWT_PRIVATE_KEY=<your_jwt_private_key>
  ```

There are two schemas - `User` and `Movie` and the following endpoints :

- User

```
  1. POST /api/auth/signup
  2. POST /api/auth/login
```

- Movie

```
  1. GET /api/movies
  2. GET /api/movies/:id
  3. POST /api/movies (protected)
  4. PUT /api/movies/:id(protected)
  5. DELETE /api/movies/:id(protected)
```

Check the postman collections inside the `docs` folder for detailed documentation of the requests and responses.

**_'protected'_ routes are accessible only by authenticated users. Such requests must bear a special header named _'x-auth-token'_ which should carry the JWT received on successful authentication**

Go ahead and use this as a REST API backend for your frontend projects. Also, feature requests and PRs are welcome :)
