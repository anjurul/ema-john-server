const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://ema-john-simple:Z8RW5xsetAPDj!s@cluster0.j1rag.mongodb.net/emaStore?retryWrites=true&w=majority";
const port = 5000

const app = express();

app.use(bodyParser.json());
app.use(cors());




const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("emaStore").collection("products");
  const orderCollection = client.db("emaStore").collection("order");

  app.post('/addProducts', (req, res) => {
    const products = req.body;
    collection.insertOne(products)
    .then(result => {
      console.log(result.insertedCount);
      res.send(result.insertedCount[0])
    })
  })

  app.get('/products', (req, res) => {
    collection.find({})
    .toArray((err, documents) => {
      res.send(documents);
    })
    
  })

  app.get('/product/:key', (req, res) => {
    collection.find({key: req.params.key})
    .toArray((err, documents) => {
      res.send(documents[0]);
    })
    
  })

  app.post('/productsByKeys', (req, res) => {
    const productKeys = req.body;
    collection.find({key: { $in: productKeys}})
    .toArray((err, documents) => {
      res.send(documents);
    })
  })

  app.post('/addOrder', (req, res) => {
    const order = req.body;
    orderCollection.insertOne(order)
    .then(result => {
      console.log(result.insertedCount);
      res.send(result.insertedCount > 0)
    })
  })
  console.log('database connected');
});




app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`)
})