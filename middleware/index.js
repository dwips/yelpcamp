// models
var Campground = require("../models/campground.js");
var Comment = require("../models/comment.js");

// ALL MIDDLEWARE
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    //is user logged in
    if (req.isAuthenticated()){
        //does the user own the campground
        Campground.findById(req.params.id, function(err, foundCampground){
            if (err || !foundCampground){
                req.flash("error", "Campground not found");
                res.redirect("back");
            }else{
                // console.log(foundCampground.author + " " + typeof foundCampground.author.id);
                // console.log(req.user + " " + typeof req.user._id);
                if (foundCampground.author.id.equals(req.user._id)){
                    next();
                }else {
                    req.flash("error", "You don't have permission!");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    //is user logged in
    if (req.isAuthenticated()){
        //does the user own the campground
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err || !foundComment){
                req.flash("error", "Comment not found");
                res.redirect("back");
            }else{
                if (foundComment.author.id.equals(req.user._id)){
                    next();
                }else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in!");
        res.redirect("back");
    }
}


middlewareObj.isLoggedIn = function(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in!");
    res.redirect("/login");
}

module.exports = middlewareObj;