const express = require('express');
const app = express();

const path = require('path');

const db = require('./server/db');
const { syncAndSeed } = db;

app.use(require('body-parser').json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.use('/api', require('./server/routes'));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, './public/index.html')));

//Note: Keep the error handling as the last route
app.use((err, req, res, next)=> {
  res.status(500).send(err);
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> `listening on port ${port}`);

syncAndSeed();

module.exports = app;
