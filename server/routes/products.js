const productsRouter = require('express').Router();
const db = require('../db');
const { Product } = db.models;
const path = require('path');

productsRouter.get('/api/products', (req, res, next)=> {
  Product.findAll()
    .then( products => res.send(products))
    .catch(next);
});

productsRouter.post('/api/products', (req, res, next)=> {
  Product.create(req.body)
    .then( product => res.send(product))
    .catch(next);
});

productsRouter.delete('/api/products/:id', (req, res, next)=> {
  Product.findById(req.params.id)
    .then( product => {
      product.destroy();  
    })
    .then( ()=> res.sendStatus(204))
    .catch(next)
});

productsRouter.put('/api/products/:id', (req, res, next)=> {
  Product.findById(req.params.id)
    .then( product => {
      Object.assign(product, req.body);
      return product.save();
    })
    .then( product => res.send(product))
    .catch(next)
});

productsRouter.use((err, req, res, next)=> {
  res.status(500).send(err);
});

module.exports = productsRouter;