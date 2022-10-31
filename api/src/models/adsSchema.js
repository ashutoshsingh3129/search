
const mongoose = require('mongoose');

const ads= mongoose.Schema({
  
    company_Id:String,
    primaryText:String,
    Headline:String,
    imageUrl:String,
    description:String,
    CTA:String,
});
module.exports= mongoose.model("ads",ads);