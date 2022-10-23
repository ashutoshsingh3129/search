const {MongoClient} = require('mongodb')
const url= 'mongodb://localhost:27017';
const databaseName='e-comm'
const client= new MongoClient(url);
const express = require('express');
require("./config");
const app = express();
const company=require('./product');
const { name } = require('ejs');

app.use(express.json());
async function dbConnect()
{
    let result = await client.connect();
    db= result.db(databaseName);
    return db.collection('ads');
   // console.log('klkklk',gh)
  
}

async function dbConnectCompany()
{
    let result = await client.connect();
    db= result.db(databaseName);
    return db.collection('company')
  
}
app.get("/search/:key",async (req,resp)=>{
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "X-Requested-With");
    resp.header('X-Content-Type-Options','nosniff')
    
    let cmpName= await dbConnectCompany();
    let Name= await cmpName.find({
        "$or" :[
        {name:{$regex:req.params.key}}
        ]
    }).toArray();
    console.log(Name)
    

    let df=await dbConnect();
    df=await df.find({
        "$or" :[
                {primaryText:{$regex:req.params.key}},
                {headline   :{$regex:req.params.key}},
                {description:{$regex:req.params.key}}
             ]
        
             } ).toArray();
    
    if(Name.length!=0){
        let ad=await dbConnect();
        console.log(Name[0]._id)
         ad=await ad.find({
            companyId:Name[0]._id
            
                 } ).toArray();
        df=ad

    }
  resp.send(df)



// solve in one query
//    let jk=await dbConnect();

//    let gh= await jk.aggregate([{
//         $lookup:{
//             from:'ads',
//             localField:'_id',
//             foreignField:'companyId',
//             as:'nkl',

//         }
//     },{
//         $match:{ "$or" :[
//             {primaryText:{$regex:req.params.key}},
//             {headline   :{$regex:req.params.key}},
            
//          ]}

//     },
// {$unwind:'$nkl'}]).toArray()
// console.log('uuuu',gh)
// resp.send(gh)
   // console.log('d',df)
    //return resp.send(nkl)
    //return df
})

app.listen(5002)
module.exports= dbConnect;