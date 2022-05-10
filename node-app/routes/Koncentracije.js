const express = require('express');
const router=express.Router();

const { MongoClient } = require('mongodb');
require('dotenv/config');
const client =  new MongoClient(process.env.DB_CONNECTION);

router.get('/getall',async (req,res)=>{
    await client.connect();
    const  database = await client.db('SOA');
    const collection = await database.collection('Koncentracije');
    const result = await collection.find().toArray();

    await res.json(result);
});


module.exports=router;