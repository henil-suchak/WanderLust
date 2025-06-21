const Joi = require("joi");

const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required().label("Title"),
    image: Joi.string().allow("").label("Image"),
    price: Joi.number().min(0).required().label("Price"),
    description: Joi.string().required().label("Description"),
    location: Joi.string().required().label("Location"),
    country: Joi.string().required().label("Country")
  }).required()
});

const reviewSchema = Joi.object({
  review: Joi.object({
    ratting: Joi.number().min(1).max(5).required().label("Rating"),
    comment: Joi.string().min(5).required().label("Comment")
  }).required()
});

module.exports = {
  listingSchema,
  reviewSchema
};