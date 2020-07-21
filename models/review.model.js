const Movie = require("./movie.model");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  movie: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
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

module.exports = mongoose.model("Review", reviewSchema);
