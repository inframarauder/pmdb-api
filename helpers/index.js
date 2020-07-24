const Movie = require("../models/movie.model");
const Review = require("../models/review.model");
const { number } = require("joi");

exports.updateRating = async (review) => {
  try {
    let reviews = await Review.find(
      { movie: review.movie },
      { rating: 1, _id: 0 }
    ).lean();

    let sumOfRatings = reviews.reduce(
      (acc, currVal) => acc.rating + currVal.rating
    );

    //some fix that i dont understand!
    if (typeof sumOfRatings !== "number") {
      sumOfRatings = reviews.reduce(
        (acc, currVal) => acc.rating + currVal.rating
      ).rating;
    }

    let avgRating = sumOfRatings / reviews.length;

    await Movie.findByIdAndUpdate(
      review.movie,
      { rating: avgRating },
      { runValidators: true }
    );
  } catch (error) {
    console.error(error);
  }
};
