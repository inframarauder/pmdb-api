const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let movieSchema = new Schema(
  {
    name: { type: String, required: true },
    genre: { type: String },
    directedBy: { type: String },
    cast: { type: String },
    plot: { type: String },
    ratings: {
      imdb: { type: Number },
      rottenTomatoes: { type: Number },
    },
    poster: { type: String },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = { Movie };
