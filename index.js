const express = require('express')
const app = express()
const ObjectId = require('mongodb').ObjectId
const { MongoClient } = require('mongodb');
const cors = require('cors')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require('dotenv').config()
const port = process.env.PORT || 5055
app.use(cors());




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hvcun.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  // console.log('connection err', err);
  const productsCollection = client.db("freshValley").collection("products");
  app.get('/products',(req,res)=>{
    productsCollection.find()
    .toArray((err,items)=>{
      res.send(items);
    })
  })

  app.post('/addProducts',(req,res)=>{
    const newProduct = req.body;
    console.log('adding new product: ', newProduct)
    productsCollection.insertOne(newProduct)
    .then(result=>{
    
      console.log('inserted count', result.insertedCount)
      res.send(result.insertedCount > 0);
    })
  })
  
  app.delete('deleteProduct/:id', (req, res) =>{
    const id = ObjectId(req.params.id);
    console.log('delete this', id);
    productsCollection.findOneAndDelete({_id: id})
    .then(documents => res.send(!!documents.value))
})

  
});
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port)


