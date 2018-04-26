const conn = require('./conn');
const { Sequelize } = conn;

const LineItem = conn.define('lineitem', {
  quantity: Sequelize.INTEGER,
  productPrice: Sequelize.FLOAT
},{
  getterMethods: {
    subtotal() {
      return (this.quantity * this.productPrice)*1;
    }
  }
}
);

LineItem.createLineItem = function(quantity, product) {
  return LineItem.create({
    quantity,
    productPrice: product.price
  })
    .then(lineItem => {
      return lineItem.setProduct(product);
    })
    .catch(err => {
      throw err;
    });
};

LineItem.prototype.changeQuantity = function(id, quantity) {
  return LineItem.findById(id)
    .then(lineItem => lineItem.update({
      quantity
    }))
    .catch(err => {
      throw err;
    });
};

module.exports = LineItem;
