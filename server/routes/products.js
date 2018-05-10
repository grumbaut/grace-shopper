const router = require('express').Router();
const db = require('../db');
const { Product } = db.models;
const { authorized, isAdmin } = require('./authFuncs');

router.get('/', (req, res, next) => {
  Product.findAll()
    .then( products => res.send(products))
    .catch(next);
});

router.post('/', authorized, isAdmin, (req, res, next) => {
  Product.create(req.body)
    .then( product => res.send(product))
    .catch(next);
});

router.delete('/:id', authorized, isAdmin, (req, res, next) => {
  Product.findById(req.params.id)
    .then( product => {
      product.destroy();
    })
    .then( ()=> res.sendStatus(204))
    .catch(next);
});

router.put('/:id', authorized, isAdmin, (req, res, next) => {
  Product.findById(req.params.id)
    .then( product => {
      Object.assign(product, req.body);
      return product.save();
    })
    .then( product => res.send(product))
    .catch(next);
});

module.exports = router;
