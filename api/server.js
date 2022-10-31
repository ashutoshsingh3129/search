const {MongoClient} = require('mongodb')
const url= 'mongodb://localhost:27017';
const databaseName='ecomm'
const client= new MongoClient(url);
const express = require('express');
require("./config");
const app = express();

app.use(express.json());
async function dbConnect()
{
    let result = await client.connect();
    db= result.db(databaseName);
    return db.collection('ads');  
}
app.get("/search/:key",async (req,resp)=>{
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "X-Requested-With");
    resp.header('X-Content-Type-Options','nosniff')
    

   let collectionName=await dbConnect();

   let response= await collectionName.aggregate([{
        $lookup:{
            from:'company',
            localField:'companyId',
            foreignField:'_id',
            as:'companyName',

        }
    },
{$unwind:'$companyName'},

{
    $match:{ "$or" :[
        {primaryText:{$regex:req.params.key}},
        {headline   :{$regex:req.params.key}},
        {description:{$regex:req.params.key}},
        {"companyName.name":{$regex:req.params.key}}
     ]}

},

]).toArray()
 resp.send(response)
   
})

app.listen(5002)
module.exports= dbConnect;