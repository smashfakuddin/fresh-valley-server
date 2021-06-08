const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.di0ox.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const port = 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const productCollection = client.db("freshValley").collection("products");
    console.log('db connected')
    app.get("/products", (req, res) => {
        productCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`I am listening to ${port}`)
})

