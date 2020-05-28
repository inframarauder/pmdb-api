const mongoose = require("mongoose");
const { Review, validateReview } = require("../models/review.model");
const { Movie } = require("../models/movie.model");

exports.list = async (req, res) => {
  try {
    let reviews = await Review.find()
      .populate({ path: "movie", select: ["name"] })
      .populate({ path: "writtenBy", select: ["username"] });

    return res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

exports.create = async (req, res) => {
  try {
    let { error } = validateReview(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    } else {
      //a user cannot give multiple reviews for the same movie
      let review = await Review.findOne({
        writtenBy: req.user._id,
        movie: req.body.movie,
      });
      if (review) {
        return res
          .status(400)
          .json({ error: "You can post only one review for a movie." });
      } else {
        let newReview = await new Review({
          ...req.body,
          writtenBy: req.user._id,
        }).save();
        await Movie.findByIdAndUpdate(req.body.movie, {
          $push: { reviews: newReview },
        });
        return res.status(201).json(newReview);
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

exports.read = async (req, res) => {
  try {
    let review = await Review.findById(req.params.id)
      .populate({ path: "movie", select: ["name"] })
      .populate({ path: "writtenBy", select: ["username"] });

    if (review) {
      return res.status(200).json(review);
    } else {
      return res.status(404).json({ error: "Review not found!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

exports.update = async (req, res) => {
  try {
    //users can update only reviews written by themselves
    let review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Review not found!" });
    } else {
      let reqUserId = mongoose.Types.ObjectId(req.user._id);
      let reviewUserId = mongoose.Types.ObjectId(review.writtenBy);
      if (reviewUserId.equals(reqUserId)) {
        //only rating and content can be updated
        review.rating = req.body.rating ? req.body.rating : review.rating;
        review.content = req.body.content ? req.body.content : review.content;

        await review.save();

        return res.status(200).json(review);
      } else {
        return res.status(403).json({
          error: "You cannot edit reviews written by someone else.",
        });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

exports.delete = async (req, res) => {
  try {
    //users can delete only reviews written by themselves
    let review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Review not found!" });
    } else {
      let reqUserId = mongoose.Types.ObjectId(req.user._id);
      let reviewUserId = mongoose.Types.ObjectId(review.writtenBy);
      if (reviewUserId.equals(reqUserId)) {
        await review.remove();
        return res.status(200).json({ success: "Review Deleted!" });
      } else {
        return res.status(403).json({
          error: "You cannot edit reviews written by someone else.",
        });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};
