var express= require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require('mongoose');
const { response } = require("express");


mongoose.connect("mongodb://localhost/yelp_camp");

//schema setup
var campSiteSchema=mongoose.Schema({name:String, image: String});
 var campSite=mongoose.model("Campsite",campSiteSchema);

/*


var campsites=[
    {name: "Murree"   ,image:"https://upload.wikimedia.org/wikipedia/commons/0/0a/Murree_treat.jpg"},
    {name:  "Kaghan"  , image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRDA7AWGYyTmUrtGrzwhuWpSn2UxW2m6FTtpCCfL1LjaU76tqMp&usqp=CAU"},
{name: "Fairy Meadows"   , image:"https://upload.wikimedia.org/wikipedia/commons/8/82/A_morning_in_Fairy_Meadows.jpg"},
{name: "Murree"   ,image:"https://upload.wikimedia.org/wikipedia/commons/0/0a/Murree_treat.jpg"},
{name:  "Kaghan"  , image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRDA7AWGYyTmUrtGrzwhuWpSn2UxW2m6FTtpCCfL1LjaU76tqMp&usqp=CAU"},
{name: "Fairy Meadows"   , image:"https://upload.wikimedia.org/wikipedia/commons/8/82/A_morning_in_Fairy_Meadows.jpg"},
{name: "Murree"   ,image:"https://upload.wikimedia.org/wikipedia/commons/0/0a/Murree_treat.jpg"},
{name:  "Kaghan"  , image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRDA7AWGYyTmUrtGrzwhuWpSn2UxW2m6FTtpCCfL1LjaU76tqMp&usqp=CAU"},
{name: "Fairy Meadows"   , image:"https://upload.wikimedia.org/wikipedia/commons/8/82/A_morning_in_Fairy_Meadows.jpg"}
]*/

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

app.get("/",function(require,respond){
    respond.render("home");
});

app.get("/campsites",function(require,respond){
    //we take the inputs from the server
    campSite.find({},function(err,campsites){
        if(err){
            console.log(err);
        }
        else{ 
            respond.render("campsites",{campsites:campsites});
            }
    });
      //now render an html page
   
});

//app post route for campgrounds
app.post("/campsites",function(require,respond){
    var name=require.body.name;
    var image=require.body.image;

    newCampground={name:name,image:image};
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

app.get("/campsites/new",function(require,respond){
    respond.render("newCampgroundForm");
});


app.listen("3000",process.env.IP,function(){
    console.log("The Yelp camp server has started to work");
});