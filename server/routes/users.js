const router = require('express').Router();
const db = require('../db');
const { User, Order, LineItem, Product } = db.models;

//USER ROUTES
router.get('/', (req, res, next)=> {
  User.findAll({
    include: [{
      model: Order,
      include: [{
        model: LineItem,
        include: [ Product ]
      }]
    }]
  })
    .then( users => res.send(users))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then( user => {
      user.destroy();
    })
    .then( ()=> res.sendStatus(204))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then( user => {
      Object.assign(user, req.body);
      return user.save();
    })
    .then( user => res.send(user))
    .catch(next);
});

//CART ROUTES
router.get('/:id/orders', (req, res, next)=> {
  Order.findAll({
    include: [{ model: LineItem }]
  })
    .then( orders => res.send(orders))
    .catch(next);
});

router.post('/:id/orders', (req, res, next)=> {
  User.findById(req.params.id)
    .then(user => Order.findOrCreateCart(user))
    .then(cart => res.send(cart))
    .catch(next);
});

router.delete('/:id/orders/:orderId', (req, res, next)=> {
  Order.findById(req.params.orderId)
    .then( order => {
      order.destroy();
    })
    .then( ()=> res.sendStatus(204))
    .catch(next);
});

router.put('/:id/orders/:orderId/add', (req, res, next)=> {
  Order.findById(req.params.orderId)
    .then(order => order.addToCart(req.body.quantity, req.body.product))
    .then(() => Order.findById(req.params.orderId, {
      include: [{
        model: LineItem,
        include: [Product]
      }]
    }))
    .then(order => res.send(order))
    .catch(next);
});

router.put('/:id/orders/:orderId/quantity', (req, res, next) => {
  LineItem.changeQuantities(req.body)
    .then(() => Order.findById(req.params.orderId, {
      include: [{
        model: LineItem,
        include: [Product]
      }]
    }))
    .then(order => res.send(order))
    .catch(next);
});

router.put('/:id/orders/:orderId/checkout', (req, res, next)=> {
  Order.findById(req.params.orderId)
    .then(order => order.checkout())
    .then(order => res.send(order))
    .catch(next);
});

module.exports = router;
