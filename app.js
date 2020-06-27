var express  = require("express"),
bodyParser   = require("body-parser"),
 mongoose    = require('mongoose'),
 campSite    = require("./models/campground"),
 Comment     = require("./models/comment"),
 User        = require("./models/user"),
 seedDB      = require("./seeds"),
 //passport packages
 passport    = require("passport"),
 LocalStrategy= require("passport-local");



 
 app=express();
mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
seedDB();


//Passport configuration
app.use(require("express-session")({
    secret: "Liono was as brave as a lion",
    resave: false,
    saveUninitialized: false
}));


//configuring passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",function(require,respond){
    respond.render("home");
});

//INDEX--shows the campSites currently in the database

app.get("/campsites",function(require,respond){
    //we take the inputs from the server
    campSite.find({},function(err,campsites){
        if(err){
            console.log(err);
        }
        else{ 
            respond.render("campgrounds/campsites",{campsites:campsites});
            }
    });
      //now render an html page
   
});


//POST---saves a new campsite to the data base
app.post("/campsites",function(require,respond){
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
app.get("/campsites/new",function(require,respond){
    respond.render("campgrounds/newCampgroundForm");
});

//SHOW----shows the details about a campground
app.get("/campsites/:id",function(require,respond){
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



//===============================
//COMMENT ROUTES
//===============================
app.get("/campsites/:id/comments/new",function(req,res){
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


app.post("/campsites/:id/comments",function(req,res){
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



//=============AUTH ROUTES

app.get("/register",function(req,res){
    res.render("register");
});

app.post("/register",function(req,res){
    var newUser= new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("register");
        }

        else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/campsites");
            });
        }
    });
});



app.listen("3000",process.env.IP,function(){
    console.log("The Yelp camp server has started to work");
});