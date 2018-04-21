const conn = require('./conn');
const { Sequelize } = conn;

const Order = conn.define('order', {
  cart: Sequelize.BOOLEAN,
  total: Sequelize.INTEGER
  //products
  //isCart : BOOL
  // Checkout, review, payment, checkout complete

  //create class method
  //line item has productId and an orderId
  //order on front end is a map of the line items that have the order id
  //add completed: Sequelize.BOOLEAN to model to check if order has been completed
});

//will have a UserId
module.exports = Order;
