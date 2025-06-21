const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  comment: {
    type: String,
    required: true,
    minlength: [5, 'Comment must be at least 5 characters long.']
  },
  ratting: {
    type: Number,
    required: true,
    min: [1, 'Rating must be at least 1.'],
    max: [5, 'Rating cannot be more than 5.']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  author: {
    type: Schema.Types.ObjectId,
    ref:"User",
  }
});

module.exports = mongoose.model("Review", reviewSchema);