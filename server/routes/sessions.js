const router = require('express').Router();
const db = require('../db');
const { User } = db.models;

router.get('/api/sessions/:token', (req, res, next)=> {
  User.authenticate(req.params.token)
    .then(token => res.send(token))
    .catch(next);
});

router.post('/api/sessions', (req, res, next) => {
  User.exchangeTokenForUser(req.body.token)
    .then(user => res.send(user))
    .catch(next);
});

module.exports = router;
