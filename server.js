const express = require('express');
const app = express();

const path = require('path');

const db = require('./db');
//const { sync, seed } = db;
//const { Product, Category, User, Order, LineItem } = db.models;

app.use('/', require('./server/routes'));

app.use(require(body-parser).json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));


app.use((err, res, res, next)=> {
    res.status(500).send(err)
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> `listening on port ${port}`);

//sync()
// .then(()=> seed())