const Movie = require("../models/movie.model");

//listing movies based on filters passed,in descending order of rating
exports.list = async (req, res) => {
  try {
    let movies = await Movie.find(res.locals.query).sort({ _id: -1 }).lean();
    return res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

//read a movie
exports.read = async (req, res) => {
  try {
    let movie = await Movie.findById(req.params.id).lean();
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
