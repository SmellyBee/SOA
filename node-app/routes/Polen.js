const { query } = require('express');
const express = require('express');
const router=express.Router();

const bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json());

const { MongoClient } = require('mongodb');
require('dotenv/config');
const client =  new MongoClient(process.env.DB_CONNECTION);

router.get('/getall',async (req,res)=>{

    await client.connect();
    const  database = await client.db('SOA');

    const collection = await database.collection('Polen');
    const result = await collection.find().toArray();

    await res.json(result);
});

router.get('/get-polen-on-specific-location',async (req,res)=>{

    await client.connect();
    const  database = await client.db('SOA');

    const collectionPolen = await database.collection('Polen');
    const collectionLokacije = await database.collection('Lokacije');

    findLocation = await collectionLokacije.findOne({name: req.body.location_name});
    findPolen = await collectionPolen.findOne();

    let array = [];
    await findPolen.results.forEach(result => {
        if(result.location==findLocation.id)
        {
             array.push(result);
        }
    });

    await res.json(array);

});



module.exports=router;