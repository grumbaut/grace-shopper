const conn = require('./conn');
const { Sequelize } = conn;

const LineItem = conn.define('lineitem', {
  quantity: Sequelize.INTEGER,
  productPrice: Sequelize.FLOAT, 
},{
  getterMethods: {
    subtotal() {
      return Number((this.quantity * this.productPrice).toFixed(2));
    }
  }
}
);

LineItem.updateOrCreateLineItem = function(order, quantity, product) {
  return this.find({
    where: {
      orderId: order.id,
      productId: product.id
    }
  })
    .then(lineItem => {
      if(!lineItem) {
        return this.create({
          quantity: quantity,
          productPrice: product.price,
          productId: product.id,
          orderId: order.id
        });
      } else {
        const updatedQuantity = (lineItem.quantity * 1) + (quantity * 1);
        return lineItem.update({
          quantity: updatedQuantity
        });
      }
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
