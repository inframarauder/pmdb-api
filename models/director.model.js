const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const directorSchema = new Schema({
  name: { type: String, required: true },
  dob: { type: Date },
  photo: { type: String },
  description: { type: String },
});

module.exports = mongoose.model("Director", directorSchema);
