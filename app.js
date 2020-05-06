//require all the essential npm modules here
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

//initialize express app
const app = express();

//setup general middleware
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//root route handler
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Public Movie Database!" });
});

//start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
