const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

let movieSchema = new Schema(
  {
    name: { type: String, required: true },
    genre: { type: String },
    directedBy: { type: String },
    cast: { type: String },
    plot: { type: String },
    ratings: {
      imdb: { type: Number, default: -1 },
      rottenTomatoes: { type: Number, default: -1 },
    },
    poster: { type: String },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

function validateMovie(movie) {
  const schema = {
    name: Joi.string().required().min(1),
    genre: Joi.string().min(1),
    directedBy: Joi.string(),
    cast: Joi.string(),
    plot: Joi.string().min(50).max(1000),
    ratings: {
      imdb: Joi.number().min(0).max(10),
      rottenTomatoes: Joi.number.min(0).max(5),
    },
  };

  return Joi.validate(movie, schema);
}

module.exports = { Movie, validateMovie };
