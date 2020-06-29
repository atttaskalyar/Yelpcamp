var express= require("express");
var router = express.Router();
var passport=require("passport");
var User=require("./../models/user");




router.get("/",function(require,respond){
    respond.render("home",{currentUser: require.user});
});




//=============AUTH ROUTES

router.get("/register",function(req,res){
    res.render("register");
});

router.post("/register",function(req,res){
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


router.get("/login",function(req,res){
    res.render("login");
});

router.post("/login",passport.authenticate("local",
{
    successRedirect: "/campsites",
    failureRedirect: "/login"
}),function(req,res){
    
});

//logout route
router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/campsites");
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
