const conn = require('./conn');
const { Sequelize } = conn;

const Order = conn.define('order', {
  //isCart : BOOL
  // Checkout, review, payment, checkout complete
});


module.exports = Order;
