const Movie = require("../models/movie.model");
const Review = require("../models/review.model");

exports.updateRating = async (review) => {
  try {
    let reviews = await Review.find(
      { movie: review.movie },
      { rating: 1, _id: 0 }
    ).lean();

    reviews = reviews.map((review) => review.rating);

    let sumOfRatings = reviews.reduce((acc, currVal) => acc + currVal);
    let avgRating = sumOfRatings / reviews.length;

    console.log("Reviews array", reviews);
    console.log("Sum", sumOfRatings);
    console.log("Average", avgRating);

    await Movie.findByIdAndUpdate(
      review.movie,
      { rating: avgRating },
      { runValidators: true }
    );
  } catch (error) {
    console.error(error);
  }
};
