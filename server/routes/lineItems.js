const router = require('express').Router();
const db = require('../db');
const { LineItem } = db.models;

router.get('/lineItems', (req, res, next)=> {
  LineItem.findAll()
    .then( lineItems => res.send(lineItems))
    .catch(next);
});

router.post('/lineItems', (req, res, next)=> {
  LineItem.create(req.body)
    .then( lineItem => res.send(lineItem))
    .catch(next);
});

router.delete('/lineItems/:id', (req, res, next)=> {
  LineItem.findById(req.params.id)
    .then( lineItem => {
      lineItem.destroy();
    })
    .then( ()=> res.sendStatus(204))
    .catch(next);
});

router.put('/lineItems/:id', (req, res, next)=> {
  LineItem.findById(req.params.id)
    .then( lineItem => {
      Object.assign(lineItem, req.body);
      return lineItem.save();
    })
    .then( lineItem => res.send(lineItem))
    .catch(next);
});

module.exports = router;
