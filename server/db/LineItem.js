const conn = require('./conn');
const { Sequelize } = conn;

const LineItem = conn.define('lineitem', {
  quantity: Sequelize.INTEGER,
  subtotal: Sequelize.FLOAT,
  productId: Sequelize.INTEGER
});

LineItem.createLineItem = function(quantity, product) {
  return LineItem.create({
    quantity,
    subtotal: quantity * product.price,
    productId: product.id
  });
};

LineItem.prototype.changeQuantity = function(id, quantity) {
  return LineItem.findById(id)
    .then(lineItem => lineItem.update({
      quantity
    }));
};

module.exports = LineItem;
