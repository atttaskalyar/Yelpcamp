var mongoose=require("mongoose");

//schema setup
var campSiteSchema=mongoose.Schema({
    name:String, 
    image: String, 
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]});
 var campSite=mongoose.model("Campsite",campSiteSchema);

module.exports=campSite;