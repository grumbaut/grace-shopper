const categoriesRouter = require('express').Router();
const db = require('../db');
const { Category } = db.models;
const path = require('path');

categoriesRouter.get('/api/categories', (req, res, next)=> {
  Category.findAll()
    .then( categories => res.send(categories))
    .catch(next);
});

categoriesRouter.post('/api/categories', (req, res, next)=> {
  Category.create(req.body)
    .then( category => res.send(category))
    .catch(next);
});

categoriesRouter.delete('/api/categories/:id', (req, res, next)=> {
  Category.findById(req.params.id)
    .then( category => {
      category.destroy();  
    })
    .then( ()=> res.sendStatus(204))
    .catch(next)
});

categoriesRouter.put('/api/categories/:id', (req, res, next)=> {
  Category.findById(req.params.id)
    .then( category => {
      Object.assign(category, req.body);
      return category.save();
    })
    .then( category => res.send(category))
    .catch(next)
});

categoriesRouter.use((err, req, res, next)=> {
  res.status(500).send(err);
});

module.exports = categoriesRouter;