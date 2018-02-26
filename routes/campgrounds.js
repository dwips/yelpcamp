var express = require("express");
var router = express.Router();
var Campground = require("../models/campground.js");
var middleware = require("../middleware");


// INDEX route - data campgrounds
router.get("/", function(req, res){
    //get all campgrounds
    Campground.find({}, function(err, allCampgrounds){
       if (err){
           console.log(err);
       } else {
           res.render("campgrounds/index", {campgrounds: allCampgrounds});
       }
    });
    
});

// CREATE route -adding new campgrounds to db
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, price: price, image: image, description: description, author: author}
    
    //create a new campground
    Campground.create(newCampground, 
        function(err, newCamp){
            if (err){
                console.log(err);
            } else {
                //redirect to campgrounds page
                res.redirect("/campgrounds");
            }   
        });
});

// NEW route - campground form
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new"); 
});


// SHOW route - show info campground
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
        if (err || !foundCamp){
            req.flash("error", "Campground not found");
            res.redirect("back");
        }else{
            res.render("campgrounds/show", {campground: foundCamp});     
        }
    });
});


// EDIT route - campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err || !foundCampground){
            req.flash("error", "Campground not found");
            return res.redirect("back");
        }
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE route - campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update the correct campground
    
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if (err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    //redirect to smewhere
});


// DELETE route - campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else {
            res.redirect("/campgrounds");
        } 
    });
});


// //MIDDLEWARE
// function checkCampgroundOwnership(req, res, next){
//     //is user logged in
//     if (req.isAuthenticated()){
//         //does the user own the campground
//         Campground.findById(req.params.id, function(err, foundCampground){
//             if (err){
//                 res.redirect("back");
//             }else{
//                 // console.log(foundCampground.author + " " + typeof foundCampground.author.id);
//                 // console.log(req.user + " " + typeof req.user._id);
//                 if (foundCampground.author.id.equals(req.user._id)){
//                     next();
//                 }else {
//                     res.redirect("back");
//                 }
//             }
//         });
//     }else{
//         res.redirect("back");
//     }
// }

// function isLoggedIn(req, res, next){
//     if (req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }

module.exports = router;