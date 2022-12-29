const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8xqwoju.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
    try {
        const postCollection = client.db('connectApp').collection('posts');

        app.get('/posts', async (req, res) => {
            const query = {}
            const result = await postCollection.find(query).toArray();
            res.send(result);
        })

        app.post('/posts', async (req, res) => {
            const post = req.body;
            const result = await postCollection.insertOne(post);
            res.send(result);
        })
    }
    finally {

    }
}

run().catch(console.log)

app.get('/', async (req, res) => {
    res.send('connect server is running')
})

app.listen(port, () => console.log(`connect running on ${port}`))