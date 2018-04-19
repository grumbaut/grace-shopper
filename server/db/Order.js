const conn = require('./conn');
const { Sequelize } = conn;

const Order = conn.define('order', {
  cart: Sequelize.BOOLEAN,
  total: Sequelize.INTEGER
  //products
  //isCart : BOOL
  // Checkout, review, payment, checkout complete

});

//will have a UserId
module.exports = Order;
