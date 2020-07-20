const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const genreSchema = new Schema({
  name: { type: String, required: true, unique: true },
  movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
});

module.exports = mongoose.model("Genre", genreSchema);
