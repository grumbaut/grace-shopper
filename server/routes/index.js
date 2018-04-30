const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/categories', require('./categories'));
router.use('/lineitems', require('./lineItems'));
router.use('/products', require('./products'));
router.use('/sessions', require('./sessions'));
router.use('/reviews', require('./reviews'));

module.exports = router;


