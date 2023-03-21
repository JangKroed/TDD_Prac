const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const productRoutes = require('./routes');
const mongoose = require('mongoose');

mongoose
    .connect(process.env.MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDb Connected...'))
    .catch((err) => console.log(err));

app.use(express.json());
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
});

module.exports = app;
