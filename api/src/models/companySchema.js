const mongoose = require('mongoose');

const companySchema= mongoose.Schema({
    
    _id:String,
    name:String,
    url:String,
});
module.exports= mongoose.model("company",companySchema);