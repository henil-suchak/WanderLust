const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controller/user.js");

router.route("/signup")
  .get(userController.renderSignup)
  .post(wrapAsync(userController.signup));

router.route("/login")
  .get(saveRedirectUrl, userController.renderLogin)
  .post(saveRedirectUrl, passport.authenticate("local", {
    failureRedirect: "/user/login",
    failureFlash: "Invalid username or password",
  }), userController.login);

router.get("/logout", userController.logout);
router.get("/reviews", wrapAsync(userController.getAllReviews));

module.exports = router;
