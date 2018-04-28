const conn = require('./conn');
const { Sequelize } = conn;

const LineItem = conn.define('lineitem', {
  quantity: Sequelize.INTEGER,
  productPrice: Sequelize.FLOAT
},{
  getterMethods: {
    subtotal() {
      return (this.quantity * this.productPrice).toFixed(2);
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

LineItem.changeQuantities = function(lineItems) {
  return Promise.all(lineItems.map(item => LineItem.findById(item.id)))
    .then(items => Promise.all(items.map(item => {
      const quantity = lineItems.find(_item => _item.id === item.id).quantity;
      return item.update({ quantity });
    })));
};

module.exports = LineItem;
