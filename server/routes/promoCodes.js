const router = require('express').Router();
const db = require('../db');
const { PromoCode } = db.models;
const { authorized, isAdmin } = require('./authFuncs');

router.get('/', (req, res, next) => {
  PromoCode.findAll()
    .then( promoCodes => res.send(promoCodes))
    .catch(next);
});

router.post('/', authorized, isAdmin, (req, res, next) => {
    PromoCode.create(req.body)
    .then( promoCode => res.send(promoCode))
    .catch(next);
});

router.delete('/:id', authorized, isAdmin, (req, res, next) => {
    PromoCode.findById(req.params.id)
    .then( promoCode => {
        promoCode.destroy();
    })
    .then( ()=> res.sendStatus(204))
    .catch(next);
});

router.put('/:id', authorized, isAdmin, (req, res, next) => {
    PromoCode.findById(req.params.id)
    .then( promoCode => {
      Object.assign(promoCode, req.body);
      return promoCode.save();
    })
    .then( promoCode => res.send(promoCode))
    .catch(next);
});

module.exports = router;