const router = require('express').Router();
const db = require('../db');
const { Review } = db.models;

router.get('/', (req, res, next) => {
  Review.findAll()
    .then( reviews => res.send(reviews))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Review.findById(req.params.id)
  .then(review => res.send(review))
  .catch(next);
});

router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then( review => Review.find({
      where: { id: review.id }
    }))
    .then(review => res.send(review))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Review.findById(req.params.id)
    .then( review => {
      Object.assign(review, req.body);
      return review.save();
    })
    .then( review => res.send(review))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Review.findById(req.params.id)
    .then( review => {
      review.destroy();
    })
    .then( () => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
