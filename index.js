const  express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
require('dotenv').config()
const cors =require('cors');
const app= express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t0nqh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db("deliveryFood");
      const servicesCollection = database.collection("services");
      const ordersCollections = database.collection("myorders")
     console.log('hitting the sever well')
     app.get('/services',async(req,res)=>{
         const cursor =servicesCollection.find({});
         const services =await cursor.toArray();
         res.send(services);
     });

    //  Api Get
    app.get('/myorders',async(req,res)=>{
        const cursor = ordersCollections.find({});
        const myorders = await cursor.toArray()
        res.json(myorders);
    });

    //  post api

    app.post('/myorders',async(req,res)=>{
        const order = req.body;
        console.log('hit the post api',order)
        res.send('post hitted')
        const result= await ordersCollections.insertOne(order);
        console.log(result)
        res.json(result)
      
      
    })
}
     finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);






app.get('/',(req,res)=>{
    res.send(' running  delivery food server');
});
app.listen(port,()=>{
    console.log('running server on port',port)
})
