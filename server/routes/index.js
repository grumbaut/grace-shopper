const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/categories', require('./categories'));
router.use('/products', require('./products'));
router.use('/lineitems', require('./lineItems'));
router.use('/sessions', require('./sessions'));

module.exports = router;


