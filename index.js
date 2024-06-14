const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const cors = require('cors')



const app = express()
const port = 3000


app.use(cors())
app.use(express.json());

const uri = process.env.MONGODB_CONNETION_STRIGN;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      
      const database = client.db("taskManager")
      const collection = database.collection("todo")
      
      app.get('/todo',async (req,res)=>{
        const cursor = await collection.find().toArray();
        res.send(cursor);
      })

      app.post('/todo',async (req,res)=>{
        const dataObject = req.body;
        const result = await collection.insertOne(dataObject)
        res.send(result);
      })

      app.delete('/todo/:id',(req,res)=>{
        const dataObject = req.body;
      })

    } finally {
    //   await client.close();
    }
  }
  run().catch(console.log);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})