const conn = require('./conn');
const { Sequelize } = conn;
const LineItemProduct = require('./LineItemProduct');
const Product = require('./Product');

const LineItem = conn.define('lineitem', {
  quantity: Sequelize.INTEGER,
  productPrice: Sequelize.FLOAT,
  subtotal: Sequelize.FLOAT,
},{
  getterMethods: {   //NO ASYNC IN VIRTUALS!!
    subtotal() {
      if(!this.productId){return 0;}
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
    .catch(err => console.error(err));
};

LineItem.prototype.changeQuantity = function(id, quantity) {
  return LineItem.findById(id)
    .then(lineItem => lineItem.update({
      quantity
    }));
};

module.exports = LineItem;
