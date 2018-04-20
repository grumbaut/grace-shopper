const router = require('express').Router();
const db = require('../db');
const { Category } = db.models;

router.get('/categories', (req, res, next)=> {
  Category.findAll()
    .then( categories => res.send(categories))
    .catch(next);
});

// I'm commenting these out, since I don't think users will be able to create or delete categories.

// router.post('/categories', (req, res, next)=> {
//   Category.create(req.body)
//     .then( category => res.send(category))
//     .catch(next);
// });

// router.delete('/categories/:id', (req, res, next)=> {
//   Category.findById(req.params.id)
//     .then( category => {
//       category.destroy();
//     })
//     .then( ()=> res.sendStatus(204))
//     .catch(next)
// });

// router.put('/api/categories/:id', (req, res, next)=> {
//   Category.findById(req.params.id)
//     .then( category => {
//       Object.assign(category, req.body);
//       return category.save();
//     })
//     .then( category => res.send(category))
//     .catch(next)
// });

module.exports = router;
