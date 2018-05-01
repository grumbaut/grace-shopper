const router = require('express').Router();
const db = require('../db');
const { LineItem } = db.models;

router.delete('/:id', (req, res, next) => {
  LineItem.findById(req.params.id)
    .then(lineItem => lineItem.destroy())
    .then(() => res.sendStatus(200))
    .catch(next);
});
module.exports = router;
