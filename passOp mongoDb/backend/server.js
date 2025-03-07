const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
const cors=require('cors')
const bodyparser=require('body-parser')
dotenv.config()
const port = 3000
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const app = express()
const dbName = 'passop';
app.use(bodyparser.json())
app.use(cors())
client.connect();
console.log('Connected successfully to server');

//get passwaord
app.get('/', async (req, res) => {
    
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

//save password
app.post('/', async (req, res) => {
    const password=req.body
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({status:true,result:findResult})
})

//delete password
app.delete('/', async (req, res) => {
    const password=req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({status:true,result:findResult})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})