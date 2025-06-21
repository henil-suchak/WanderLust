const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/expressError.js");
const Listing = require("../model/listing.js");
const { isLoggedIn, isOwner,validateSchema } = require("../middleware.js");
const listingController=require("../controller/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router.route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn, validateSchema,upload.single('listing[image]'), wrapAsync(listingController.showRoute));


router.get("/login", (req, res) => {
    res.render("users/login", { title: "Login" });
});

router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateSchema, wrapAsync(listingController.updateList))
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteList));

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editList));

module.exports = router;
