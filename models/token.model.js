const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  refreshToken: { type: String },
});

module.exports = mongoose.model("Token", tokenSchema);
