const router = require('express').Router();
const db = require('../db');
const { Product, Category, User, Order, LineItem } = db.models;
const path = require('path');

router.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.use('/users', require('./server/routes/users'));
app.use('/categories', require('./server/routes/categories'));
app.use('/lineitems', require('./server/routes/lineitems'));
app.use('/orders', require('./server/routes/orders'));
app.use('/products', require('./server/routes/products'));

module.exports = router;


