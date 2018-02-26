var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
            name: "Camp Bali",
            image: "https://farm4.staticflickr.com/3211/2932283601_2f9fda9332_b.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        },
        {
            name: "Camp Bali",
            image: "https://farm5.staticflickr.com/4118/4797730004_fbff6f98a8_b.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        },
        {
            name: "Camp Bali",
            image: "https://farm4.staticflickr.com/3098/3201450485_e774d55c4e_b.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        },
        {
            name: "Camp Bali",
            image: "https://farm4.staticflickr.com/3211/2932283601_2f9fda9332_b.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        }
    ]



function seedDB(){
    Campground.remove({}, function(err){
        if (err){
            console.log(err);
        }
        console.log("removed ALL campgrounds!");
        
        // //ADD seeds
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err, campground){
        //         if (err){
        //             console.log(err);
        //         } else {
        //             console.log("CAMPGROUND ADDED");
        //             Comment.create({
        //                 text: "This is a comment for Campground",
        //                 author: "Dede"
        //             }, function(err, comment){
        //                 if (err){
        //                     console.log(err);
        //                 } else {
        //                     campground.comments.push(comment._id);
        //                     campground.save();
        //                     console.log("COMMENT ADDED");
        //                 }
        //             });
        //         }
        //     });
        // });
    });
}

module.exports = seedDB;
