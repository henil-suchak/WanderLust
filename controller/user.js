const User = require("../model/user");
const Review = require("../model/reviews");

module.exports.renderSignup = (req, res) => {
    res.render("./users/signup.ejs", { title: "Sign Up" });
};

module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        let registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("successUser", "New user is registered");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("errorUserDuplicate", e.message);
        res.redirect("/user/signup");
    }
};

module.exports.renderLogin = (req, res) => {
    res.render("./users/login.ejs", { title: "Log In" });
};

module.exports.login = (req, res) => {
    req.flash("loginSuccess", "Welcome back!");
    console.log(req.user._id);
    res.redirect(res.locals.redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) return next(err);
        req.flash("success", "You have successfully logged out.");
        res.redirect("/listings");
    });
};

module.exports.getAllReviews = async (req, res) => {
    const reviews = await Review.find().populate("author");
    res.render("reviews/all", { reviews, title: "All Reviews" });
};