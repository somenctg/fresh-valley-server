const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
const cors = require('cors')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require('dotenv').config()
const port = process.env.PORT || 5055
app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hvcun.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log('connection err', err);
  const productCollection = client.db("freshValley").collection("products");
  console.log('database connected successfully')
  // perform actions on the collection object
  // client.close();
});

