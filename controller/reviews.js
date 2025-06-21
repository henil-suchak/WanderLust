const Review = require("../model/reviews");
const Listing = require("../model/listing");

module.exports.createReview = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    const { comment, ratting } = req.body.review;
    const newReview = new Review({ comment, ratting });
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
};