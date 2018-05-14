const router = require('express').Router();
const db = require('../db');
const { User, Order, LineItem, Product, Address } = db.models;
const { authorized, isCorrectUser, isAdmin } = require('./authFuncs');

//USER ROUTES
router.get('/', authorized, isAdmin, (req, res, next)=> {
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

router.delete('/:id', authorized, isCorrectUser('params', 'id'), (req, res, next) => {
  User.findById(req.params.id)
    .then( user => {
      user.destroy();
    })
    .then( ()=> res.sendStatus(204))
    .catch(next);
});

router.put('/:id', authorized, isCorrectUser('params', 'id'), (req, res, next) => {
  User.findById(req.params.id)
    .then( user => {
      return user.update(req.body);
    })
    .then( user => res.send(user))
    .catch(next);
});

//USER ORDER ROUTES
router.get('/:id/orders', (req, res, next)=> {
  Order.findAll({
    where: {
      userId: req.params.id
    }, include: [{
      model: LineItem,
      include: [Product]
    }]
  })
    .then( orders => res.send(orders))
    .catch(next);
});

router.post('/:id/orders', (req, res, next)=> {
  Order.findOrCreateCart(req.params.id)
    .then(cart => res.send(cart))
    .catch(next);
});

router.delete('/:id/orders/:orderId', authorized, isCorrectUser('params', 'id'), (req, res, next) => {
  Order.findById(req.params.orderId)
    .then(order => order.cancelOrder())
    .then(order => res.send(order))
    .catch(next);
});

router.delete('/:id/orders/:orderId/lineitems/:lineItemId', authorized, isCorrectUser('params', 'id'), (req, res, next) => {
  LineItem.findById(req.params.lineItemId)
    .then(lineItem => lineItem.destroy())
    .then(() => res.sendStatus(200))
    .catch(next);
});

router.put('/:id/orders/:orderId', authorized, isCorrectUser('params', 'id'), (req, res, next) => {
  Order.findById(req.params.orderId)
    .then(order => order.update(req.body))
    .then(() => Order.findById(req.params.orderId, {
      include: [{
        model: LineItem,
        include: [Product]
      }]
    }))
    .then(order => res.send(order))
    .catch(next);
});

router.put('/:id/orders/:orderId/add', authorized, isCorrectUser('params', 'id'), (req, res, next) => {
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

router.put('/:id/orders/:orderId/quantity', authorized, isCorrectUser('params', 'id'), (req, res, next) => {
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

router.put('/:id/orders/:orderId/checkout', authorized, isCorrectUser('params', 'id'), (req, res, next) => {
  Order.findById(req.params.orderId, {
    include: [{
      model: LineItem,
      include: [Product]
    }]
  })
    .then(order => order.checkout(req.params.id, req.body))
    .then(order => res.send(order))
    .catch(next);
});

//ADDRESS ROUTES
router.get('/:id/addresses', authorized, isCorrectUser('params', 'id'), (req, res, next) => {
  Address.findAll({
    where: { userId: req.params.id }
  })
    .then(addresses => res.send(addresses))
    .catch(next);
});

router.post('/:id/addresses', authorized, isCorrectUser('params', 'id'), (req, res, next) => {
  Address.create(req.body)
    .then(address => {
      return User.findById(req.params.id)
        .then(user => address.setUser(user));
    })
    .then(address => res.send(address))
    .catch(next);
});

router.put('/:id/addresses/:addressId', authorized, isCorrectUser('params', 'id'), (req, res, next) => {
  Address.findById(req.params.addressId)
    .then(address => address.update(req.body))
    .then(address => res.send(address))
    .catch(next);
});

module.exports = router;
