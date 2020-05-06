//require all the essential npm modules here
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

//require app dependencies
const db = require("./configs/db");
const routes = require("./routes");

//initialize express app
const app = express();

//setup general middleware
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//DB connection
db.createConnection();

//root route handler
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Public Movie Database!" });
});

//other routes
app.use("/api", routes);

//start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
