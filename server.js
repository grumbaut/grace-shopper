const express = require('express');
const app = express();

const path = require('path');

const db = require('./server/db');
const { sync, seed } = db;
//const { Product, Category, User, Order, LineItem } = db.models;

app.use(require('body-parser').json());
app.use(express.static(path.join(__dirname, 'public')));
//We don't need /public in the above line, since this is a static route. Express wil look here first to see if any files being called for exist here.
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.use('/api', require('./server/routes'));
//The routes should just be used for calls to /api. The only other route we'll need is for requests to /, which we can handle below.

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, './public/index.html')));

//Note: Keep the error handling as the last route
app.use((err, res, next)=> {
  res.status(500).send(err);
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> `listening on port ${port}`);

sync()
  .then(()=> seed());
