const Movie = require("../models/movie.model");
const Review = require("../models/review.model");

exports.updateRating = async (review) => {
  try {
    let reviews = await Review.find(
      { movie: review.movie },
      { rating: 1, _id: 0 }
    ).lean();

    let avgRating =
      reviews.reduce((acc, currVal) => acc.rating + currVal.rating).rating /
      reviews.length;

    await Movie.findByIdAndUpdate(
      review.movie,
      { rating: avgRating },
      { runValidators: true }
    );
  } catch (error) {
    console.error(error);
  }
};
