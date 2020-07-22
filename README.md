# Public Movie Database - PMDb (API)

This is an open source movie database (similar to IMDb). Several movies are listed here. The users can rate and write reviews for the movies. The rating of a movie is calculated based upon ratings given by various users.
Only admin can add/edit/delete a movie.

Deployed at : https://pmdbapi.herokuapp.com/

### Running the App

To run the app, you must have Node.js and MongoDB installed

- Clone the repo
- Open a terminal window inside the project directory
- run the command `npm install`
- create a file called `.env` at the root of the project directory
- add the following environment variables in the file:
  ```
  PORT=<preffered port no>
  DB_URI=<your_mongo_connection_string>
  ACCESS_TOKEN_SECRET=<your_access_token_secret>
  REFRESH_TOKEN_SECRET=<your_refresh_token_secret>
  TOKEN_EXPIRY_TIME=<expiry_time_in_seconds>
  ```
- run the command `npm start` in the terminal

### Documentation

Will be updated soon :)
