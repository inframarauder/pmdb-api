const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let movieSchema = new Schema(
  {
    name: { type: String, required: true, index: true },
    genres: { type: String, index: true },
    year: { type: String, index: true },
    directors: { type: String, index: true },
    starring: { type: String, index: true },
    runtime: { type: Number },
    poster: { type: String },
    plot: { type: String },
    rating: { type: Number, min: 0, max: 10 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
