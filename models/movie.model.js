const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

let movieSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    genre: { type: String },
    year: { type: Number },
    directedBy: { type: String },
    cast: { type: String },
    plot: { type: String },
    rating: { type: Number, default: -1 },
    poster: { type: String },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

//server side validation logic for incoming requests
function validateMovie(movie) {
  const schema = {
    name: Joi.string().required().min(1),
    genre: Joi.string().min(1),
    year: Joi.number().min(1850),
    directedBy: Joi.string(),
    cast: Joi.string(),
    plot: Joi.string().min(50).max(1000),
    rating: Joi.number().min(0).max(10),
    poster: Joi.string().uri(),
  };

  return Joi.validate(movie, schema);
}

module.exports = { Movie, validateMovie };
