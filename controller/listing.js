const Listing=require("../model/listing.js");

module.exports.index=async (req, res) => {
    const listings = await Listing.find({}, '_id title image price');
    res.render("lists", { listings, title: "All Listings" });
};

module.exports.renderNewForm=(req, res) => {

    res.render("new", { title: "Create New Listing" });
};

module.exports.showRoute=async (req, res, next) => {
    let url=req.file.path;
    let filename=req.file.filename;

    const listingData = req.body.listing;
    const listing = new Listing(listingData);
    listing.image={url,filename};
    listing.owner = req.user._id;
    await listing.save();
    req.flash("success", "New listing added successfully!");
    res.redirect("/listings");
};

module.exports.showListing=async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({path:"reviews",
        populate:{
            path:"author",
        },
    })
    .populate("owner");
    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }
    console.log(listing);
    res.render("show", { listing, title: listing.title });
}

module.exports.editList = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }
    let originalImageUrl;
    if (listing.image?.url && listing.image.url.includes("/upload")) {
        originalImageUrl = listing.image.url.replace("/upload", "/upload/h_300,w_250");
    } else {
        originalImageUrl = listing.image?.url || null;
    }
    res.render("edit", { listing, originalImageUrl, title: `Edit ${listing.title}` });
};

module.exports.updateList = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body.listing;

    if (req.file) {
        updatedData.image = {
            url: req.file.path,
            filename: req.file.filename,
        };
    }

    await Listing.findByIdAndUpdate(id, updatedData);
    req.flash("successEdit", "Listing updated successfully!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteList=async (req, res) => {
    await Listing.findOneAndDelete({ _id: req.params.id });
    req.flash("successDelete", "Listing deleted successfully!");
    res.redirect("/listings");
};