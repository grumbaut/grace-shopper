const router = require('express').Router();
//Path and db are not being used, so they're not required. App should be router below. We can trim the requires to just './users' etc.

router.use('/users', require('./users'));
router.use('/categories', require('./categories'));
router.use('/lineitems', require('./lineitems'));
router.use('/orders', require('./orders'));
router.use('/products', require('./products'));

module.exports = router;


