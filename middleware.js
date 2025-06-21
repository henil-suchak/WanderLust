const { listingSchema,reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/expressError.js");


module.exports.isLoggedIn = (req,res,next)=>{
    if (!req.isAuthenticated()) {

        req.session.redirectUrl=req.originalUrl;
        req.flash("errorNAuthenticated", "first you must log in.");
        return res.redirect("/user/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>
{
    res.locals.redirectUrl = req.session.redirectUrl || "/listings";
    next();
}

const Listing = require("./model/listing");

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found.");
        return res.redirect("/listings");
    }
    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "You are not authorized to perform this action.");
        return res.redirect("/listings");
    }
    next();
};

const Review = require("./model/reviews");

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review) {
        req.flash("error", "Review not found.");
        return res.redirect(`/listings/${id}`);
    }
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You are not authorized to perform this action.");
        return res.redirect(`/listings/${id}`);
    }
    next();
};


module.exports.validateSchema = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
};


module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details.map(el => el.message).join(", "));
    } else {
        next();
    }
};