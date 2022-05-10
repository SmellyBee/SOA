const express = require('express');
const router=express.Router();

const bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json());

const { MongoClient } = require('mongodb');
const req = require('express/lib/request');
const res = require('express/lib/response');
require('dotenv/config');
const client =  new MongoClient(process.env.DB_CONNECTION);


router.get('/getall',async(req,res)=>{
    
    await client.connect();
    const  database = await client.db('SOA');
    const collection = await database.collection('Alergeni');
    const result = await collection.find().toArray();

    await res.json(result);
    
});

router.get("/get-alergen-of-specific-type", async (req,res)=>{

        await client.connect();
        const  database = await client.db('SOA');
    
        const collectionAlergeni = await database.collection('Alergeni');
        const collectionTipoviAlergena = await database.collection('TipoviAlergena');
    
        findTipAlergena = await collectionTipoviAlergena.findOne({name: req.body.name});
        findAlergeni = await collectionAlergeni.find().toArray();
    
        let array = [];
        await findAlergeni.forEach(result => {
            if(result.allergenicity==findTipAlergena.id)
            {
                 array.push(result);
            }
        });
    
        await res.json(array);
    
});



module.exports=router;