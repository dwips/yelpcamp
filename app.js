var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    flash                   = require("connect-flash"),
    seedDB                  = require("./seeds"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    methodOverride          = require("method-override");

//routes
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");

//models
var Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user");

//create the database
mongoose.connect("mongodb://localhost/yelp_camp_v12");

//body parser for retrieve data from body
app.use(bodyParser.urlencoded({extended: true}));

//set view engine
app.set("view engine", "ejs");

//set public folder
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//set flash message
app.use(flash());

//seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "I am trying to be better!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MIDDLEWARE currentUser
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//routes
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//listen for request
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("starting");
});