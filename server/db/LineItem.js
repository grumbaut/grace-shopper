const conn = require('./conn');
const { Sequelize } = conn;
const LineItemProduct = require('./LineItemProduct');
const Product = require('./Product');

const LineItem = conn.define('lineitem', {
  quantity: Sequelize.INTEGER,
  subtotal: Sequelize.FLOAT
});

LineItem.createLineItem = function(quantity, product) {
  return LineItem.create({
    quantity,
    subtotal: quantity * product.price
  })
    .then(lineItem => {
      return lineItem.setProduct(product);
    })
    .catch(err => console.error(err));
};

LineItem.prototype.changeQuantity = function(id, quantity) {
  return LineItem.findById(id)
    .then(lineItem => lineItem.update({
      quantity
    }));
};

module.exports = LineItem;
