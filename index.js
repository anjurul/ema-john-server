
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER}>@cluster0.j1rag.mongodb.net/emaShop?retryWrites=true&w=majority`;
const port = 5000


const app = express();
app.use(cors);
app.use(bodyParser.json);


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const products = client.db("emaShop").collection("product");

  
    app.post('/addProduct', (req, res) => {
        res.send('Hello ema-john!')
    })

  console.log('database connected');
});


app.get('/', (req, res) => {
    res.send('Hello ema-john!')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})