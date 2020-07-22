const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  movie: { type: Schema.Types.ObjectId, required: true, index: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, min: 0, max: 10 },
  content: { type: String, minlength: 10, maxlength: 1000 },
});

module.exports = mongoose.model("Review", reviewSchema);
