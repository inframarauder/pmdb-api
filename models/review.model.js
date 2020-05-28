const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  movie: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
  writtenBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true, minlength: 10, maxlength: 1000 },
});

const Review = mongoose.model("Review", reviewSchema);

function validateReview(review) {
  const schema = {
    content: Joi.string().min(10).max(1000).required(),
    movie: Joi.objectId().required(),
    writtenBy: Joi.objectId().required(),
  };

  return Joi.validate(review, schema);
}

module.exports = { Review, validateReview };
