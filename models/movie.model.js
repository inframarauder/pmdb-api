const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let movieSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    genres: { type: String },
    year: { type: String },
    directors: { type: String },
    starring: { type: String },
    runtime: { type: Number },
    poster: { type: String },
    plot: { type: String },
    rating: { type: Number, min: 0, max: 10 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
