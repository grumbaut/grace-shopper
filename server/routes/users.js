const usersRouter = require('express').Router();
const db = require('../db');
const { User } = db.models;
const path = require('path');



usersRouter.get('/api/users', (req, res, next)=> {
  User.findAll()
    .then( users => res.send(users))
    .catch(next);
});

usersRouter.post('/api/users', (req, res, next)=> {
  User.create(req.body)
    .then( user => res.send(user))
    .catch(next);
});

usersRouter.delete('/api/users/:id', (req, res, next)=> {
  User.findById(req.params.id)
    .then( user => {
      user.destroy();  
    })
    .then( ()=> res.sendStatus(204))
    .catch(next)
});

usersRouter.put('/api/users/:id', (req, res, next)=> {
  User.findById(req.params.id)
    .then( user => {
      Object.assign(user, req.body);
      return user.save();
    })
    .then( user => res.send(user))
    .catch(next)
});

usersRouter.use((err, req, res, next)=> {
  res.status(500).send(err);
});

module.exports = usersRouter;