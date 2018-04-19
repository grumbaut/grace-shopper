const conn = require('./conn');
const { Sequelize } = conn;

const Order = conn.define('order', {
  cart: Sequelize.BOOL,
  total: Sequelize.INTEGER
  //isCart : BOOL
  // Checkout, review, payment, checkout complete

});

//will have a UserId
module.exports = Order;
