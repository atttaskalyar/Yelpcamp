var express= require("express");
var router= express.Router({mergeParams:true});
var campSite=require("./../models/campground");



//INDEX--shows the campSites currently in the database

router.get("/",function(require,respond){
    //we take the inputs from the server
    console.log(require.user);
    campSite.find({},function(err,campsites){
        if(err){
            console.log(require.user);
            console.log(err);
        }
        else{ 
            console.log(require.user);
            respond.render("campgrounds/campsites",{campsites:campsites,currentUser:require.user});
            }
    });
      //now render an html page
   
});


//POST---saves a new campsite to the data base
router.post("/",function(require,respond){
    var name=require.body.name;
    var image=require.body.image;
    var description=require.body.description;
    newCampground={name:name,image:image,description:description};
   //create new campground and then send to data base
   campSite.create(newCampground,function(err,newlyCreated){
       if(err){
           console.log(err);
       }
       else{
        respond.redirect("/campsites");
       }
   });
    
});
//NEW---- shows a form to create a new campsite 
router.get("/new",function(require,respond){
    respond.render("campgrounds/newCampgroundForm");
});

//SHOW----shows the details about a campground
router.get("/:id",function(require,respond){
    //find the campground wiht provided ID
    campSite.findById(require.params.id).populate("comments").exec(function(err,foundCampsite){
        if(err){
            console.log("an error has occured so we cannot execute the program");
            console.log(err);
        }
        else{
            console.log(foundCampsite);
            respond.render("campgrounds/show",{campsite:foundCampsite});
        }
    });
    //rendwe show template with that campsite
});


module.exports=router;

