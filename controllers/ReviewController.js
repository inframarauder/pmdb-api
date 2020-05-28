const { Review, validateReview } = require("../models/review.model");

exports.list = async (req, res) => {
  try {
    let reviews = await Review.find()
      .populate("movie")
      .populate("writtenBy")
      .select("movie.name", "writtenBy.username", "content");

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
      let review = await new Review(req.body).save();
      return res.status(201).json(review);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

exports.read = async (req, res) => {
  try {
    let review = await Review.findById(req.params.id)
      .populate("movie")
      .populate("writtenBy")
      .select("movie.name", "writtenBy.username", "content");

    if (!review) {
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
    let { id } = req.params;
    if (id === req.user._id) {
      //only rating and content can be updated
      let review = await Review.findByIdAndUpdate(
        id,
        { rating: req.body.rating, content: req.body.content },
        { new: true, runValidators: true }
      )
        .populate("movie")
        .populate("writtenBy")
        .select("movie.name", "writtenBy.username", "content");

      return res.status(200).json(review);
    } else {
      return res.status(403).json({
        error: "You cannot edit reviews written by someone else.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

exports.delete = async (req, res) => {
  try {
    //users can delete only reviews written by themselves
    let { id } = req.params;
    if (id === req.user._id) {
      await Review.findByIdAndDelete(id);
      return res.status(200).json({ success: "Review deleted!" });
    } else {
      return res.status(403).json({
        error: "You cannot delete reviews written by someone else.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};
