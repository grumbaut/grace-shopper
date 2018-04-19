const router = require('express').Router();
const db = require('../db');
const { User } = db.models;

router.get('/users', (req, res, next)=> {
  User.findAll()
    .then( users => res.send(users))
    .catch(next);
});

router.post('/users', (req, res, next)=> {
  User.create(req.body)
    .then( user => res.send(user))
    .catch(next);
});

router.delete('/users/:id', (req, res, next)=> {
  User.findById(req.params.id)
    .then( user => {
      user.destroy();
    })
    .then( ()=> res.sendStatus(204))
    .catch(next);
});

router.put('/users/:id', (req, res, next)=> {
  User.findById(req.params.id)
    .then( user => {
      Object.assign(user, req.body);
      return user.save();
    })
    .then( user => res.send(user))
    .catch(next);
});

module.exports = router;
