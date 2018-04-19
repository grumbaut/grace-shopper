const ordersRouter = require('express').Router();
const db = require('../db');
const { Order } = db.models;
const path = require('path');

ordersRouter.get('/api/orders', (req, res, next)=> {
  Order.findAll()
    .then( orders => res.send(orders))
    .catch(next);
});

ordersRouter.post('/api/orders', (req, res, next)=> {
  Order.create(req.body)
    .then( order => res.send(order))
    .catch(next);
});

ordersRouter.delete('/api/orders/:id', (req, res, next)=> {
  Order.findById(req.params.id)
    .then( order => {
      order.destroy();  
    })
    .then( ()=> res.sendStatus(204))
    .catch(next)
});

ordersRouter.put('/api/orders/:id', (req, res, next)=> {
  Order.findById(req.params.id)
    .then( order => {
      Object.assign(order, req.body);
      return order.save();
    })
    .then( order => res.send(order))
    .catch(next)
});

ordersRouter.use((err, req, res, next)=> {
  res.status(500).send(err);
});

module.exports = ordersRouter;