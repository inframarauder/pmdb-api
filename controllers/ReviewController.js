const mongoose = require("mongoose");
const Review = require("../models/review.model");

exports.list = async (req, res) => {
  try {
    let reviews = await Review.find()
      .populate({
        path: "author",
        select: ["username"],
      })
      .sort({ rating: -1 });

    return res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

exports.create = async (req, res) => {
  try {
    //a user cannot give multiple reviews for the same movie
    let review = await Review.findOne({
      author: req.user._id,
      movie: req.body.movie,
    });
    if (review) {
      return res
        .status(400)
        .json({ error: "You can post only one review for a movie." });
    } else {
      let newReview = await new Review({
        ...req.body,
        author: req.user._id,
      }).save();
      return res.status(201).json(newReview);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

exports.read = async (req, res) => {
  try {
    let review = await Review.findById(req.params.id).populate({
      path: "writtenBy",
      select: ["username"],
    });

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
    delete req.body["movie"];
    delete req.body["author"];

    //users can update only reviews written by themselves
    let review = await Review.findOneAndUpdate(
      {
        _id: req.params.id,
        author: req.user._id,
      },
      req.body,
      { new: true, runValidators: true }
    ).populate({ path: "author", select: ["username"] });
    if (!review) {
      return res.status(404).json({ error: "Review not found!" });
    } else {
      return res.status(200).json(review);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

exports.delete = async (req, res) => {
  try {
    //users can delete only reviews written by themselves
    let review = await Review.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id,
    });

    if (!review) {
      return res.status(404).json({ error: "Review not found!" });
    } else {
      return res.status(200).json({ message: "Deleted!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};
