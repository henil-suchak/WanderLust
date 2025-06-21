const mongoose = require("mongoose");
const Review = require("./reviews");

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
       url:String,
       filename:String,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review",
        },
    ]
});

listingSchema.pre("findOneAndDelete", async function (next) {
  const listing = await this.model.findOne(this.getQuery());
  if (listing && listing.reviews.length > 0) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
  next();
});
module.exports = mongoose.model("Listing", listingSchema);
