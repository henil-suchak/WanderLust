require("dotenv").config();


const path = require("path");
const express = require("express");
const methodOverride = require("method-override");
const app = express();
const mongoose = require("mongoose");

const dbUrl=process.env.ATLASDB_URL;
const ejsMate = require("ejs-mate");
const listings = require("./routes/listing.js");
const reviews = require("./routes/reviews.js");
const user=require("./routes/user.js");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./model/user.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.use(express.static(path.join(__dirname, "/public")));
app.engine('ejs', ejsMate);
const store=MongoStore.create(
    {
        mongoUrl:dbUrl,
        crypto:{
            secret:process.env.SECRET,
        },
        touchAfter:24*3600,
    }
)

store.on("error",()=>
{
    console.log("Error",err);
})
const sessionOptions = {
    store,
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true,
    }
};

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


async function main() {
    await mongoose.connect(dbUrl);
    console.log("MongoDB connected");
}
main().catch(err => console.log("MongoDB connection error:", err));



app.use((req, res, next) => {
    res.locals.currentUser = req.user; 
    res.locals.success = req.flash("success");
    res.locals.successEdit = req.flash("successEdit");
    res.locals.successDelete = req.flash("successDelete");
    res.locals.error = req.flash("error");
    res.locals.successUser = req.flash("successUser");
    res.locals.errorUserDuplicate = req.flash("errorUserDuplicate");
    res.locals.loginError = req.flash("loginError");
    res.locals.loginSuccess = req.flash("loginSuccess");
    res.locals.errorNAuthenticated=req.flash("errorNAuthenticated");
    next();

});
app.get("/", (req, res) => {
    res.redirect("/listings");
});
app.use("/listings", listings)
app.use("/listings/:id/reviews", reviews);
app.use("/user", user);
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    res.status(status).render("error", { status, message, title: `Error ${status}` });
});



app.listen(8080, () => {
    console.log("server is working");
});
