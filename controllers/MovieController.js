const Movie = require("../models/movie.model");
const Review = require("../models/review.model");

//listing movies based on filters passed,in descending order of rating
exports.list = async (req, res) => {
  try {
    let movies = await Movie.find(res.locals.query, { reviews: 0 })
      .sort({
        rating: -1,
      })
      .lean();

    return res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

//read a movie
exports.read = async (req, res) => {
  try {
    let movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found!" });
    } else {
      return res.status(200).json(movie);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

//get average rating of a movie
exports.avgRating = async (req, res) => {
  try {
    let reviews = await Review.find(
      { movie: req.params.id },
      { rating: 1 }
    ).lean();
    let sum = reviews.reduce((acc, currVal) => acc.rating + currVal.rating);
    let avgRating = sum / reviews.length;
    return res.status(200).json({ avgRating });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};
