const { Movie } = require("./movie.model");
const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  movie: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
  writtenBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, min: 0, max: 10 },
  content: { type: String, minlength: 10, maxlength: 1000 },
});

reviewSchema.pre("save", function (next) {
  this.wasNew = this.isNew;
  next();
});

/**
 * This post hook serves two purposes:
 * - update movie with new review
 * - update average rating of the movie
 */
reviewSchema.post("save", async function () {
  try {
    let movie;
    if (this.wasNew) {
      movie = await Movie.findByIdAndUpdate(
        this.movie,
        { $push: { reviews: this } },
        { new: true, runValidators: true }
      ).populate({ path: "reviews", select: "rating" });
    } else {
      movie = await Movie.findById(this.movie).populate({
        path: "reviews",
        select: { rating: 1, _id: 0 },
      });
    }
    let reviews = movie.reviews.map((review) => review.rating);
    let averageRating = reviews.reduce((a, b) => a + b) / reviews.length;
    movie.rating = averageRating;

    await movie.save();
  } catch (error) {
    console.error(error);
  }
});

const Review = mongoose.model("Review", reviewSchema);

function validateReview(review) {
  const schema = {
    content: Joi.string().min(10).max(1000).required(),
    rating: Joi.number().required().min(0).max(10),
    movie: Joi.objectId().required(),
  };

  return Joi.validate(review, schema);
}

module.exports = { Review, validateReview };
