var express= require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require('mongoose');
const { response } = require("express");


mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser:true});

//schema setup
var campSiteSchema=mongoose.Schema({
    name:String, 
    image: String, 
    description: String});
 var campSite=mongoose.model("Campsite",campSiteSchema);


campSite.create({
    name:"Murree",
    image:"data:image/jpeg;base64,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",
    description:"One of the most beautiful places of pakistan. A must to visit"
},function(error,campsite){
    if(error){
        console.log(error);
    }
    else{
        console.log("object saved to database");
    }
});

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

//INDEX--shows the campSites currently in the database

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


//POST---saves a new campsite to the data base
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
//NEW---- shows a form to create a new campsite 
app.get("/campsites/new",function(require,respond){
    respond.render("newCampgroundForm");
});

//SHOW----shows the details about a campground
app.get("/campsites/:id",function(require,respond){
    //find the campground wiht provided ID
    //rendwe show template with that campsite
    respond.render("show");
});


app.listen("3000",process.env.IP,function(){
    console.log("The Yelp camp server has started to work");
});