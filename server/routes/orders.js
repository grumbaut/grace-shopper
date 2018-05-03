const router = require('express').Router();
const db = require('../db');
const { Order, LineItem, Product } = db.models;

router.get('/', (req, res, next) => {
  Order.findAll({
    include: [{
      model: LineItem,
      include: [Product]
    }]
  })
    .then(orders => res.send(orders))
    .catch(next);
});

module.exports = router;
