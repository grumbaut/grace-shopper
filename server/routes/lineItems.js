const lineItemsRouter = require('express').Router();
const db = require('../db');
const { LineItem } = db.models;
const path = require('path');

lineItemsRouter.get('/api/lineItems', (req, res, next)=> {
  LineItem.findAll()
    .then( lineItems => res.send(lineItems))
    .catch(next);
});

lineItemsRouter.post('/api/lineItems', (req, res, next)=> {
  LineItem.create(req.body)
    .then( lineItem => res.send(lineItem))
    .catch(next);
});

lineItemsRouter.delete('/api/lineItems/:id', (req, res, next)=> {
  LineItem.findById(req.params.id)
    .then( lineItem => {
      lineItem.destroy();  
    })
    .then( ()=> res.sendStatus(204))
    .catch(next)
});

lineItemsRouter.put('/api/lineItems/:id', (req, res, next)=> {
  LineItem.findById(req.params.id)
    .then( lineItem => {
      Object.assign(lineItem, req.body);
      return lineItem.save();
    })
    .then( lineItem => res.send(lineItem))
    .catch(next)
});

lineItemsRouter.use((err, req, res, next)=> {
  res.status(500).send(err);
});

module.exports = lineItemsRouter;