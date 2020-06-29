var express= require("express");
var router= express.Router();
var campSite=require("../models/campground");
var Comment = require("../models/comment");

//===============================
//COMMENT ROUTES
//===============================
router.get("/new",isLoggedIn,function(req,res){
    //find campground by id
    campSite.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{campground: campground});
        }
    });
});


router.post("/",isLoggedIn,function(req,res){
    //lookup campground using id
    campSite.findById(req.params.id,function(err,campsite){
        if(err){
            console.log(err);
            res.redirect("/campsites");
        }
        else{
            console.log(req.body.comment);
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }
                else{
                    campsite.comments.push(comment);
                    campsite.save();
                    res.redirect("/campsites/"+campsite._id);
                    
                }
            });
        }
    })
    //create new comment
    //connect new comment to campground
    //redirect campgroun to show page
});


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/login");
    }
}

module.exports=router;

