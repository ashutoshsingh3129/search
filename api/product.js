const mongoose = require('mongoose');
const productSchema= mongoose.Schema({
  
    company_Id:String,
    primaryText:String,
    Headline:String,
    CTA:String,
});


const companySchema= mongoose.Schema({
    
    _id:String,
    name:String,
    url:String,
});
module.exports= mongoose.model("company",companySchema);

