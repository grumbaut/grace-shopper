const conn = require('./conn');
const { Sequelize } = conn;
const { Product } = require('./Product');

const LineItem = conn.define('lineitem', {
  quantity: Sequelize.INTEGER,
  total: {
    type: Sequelize.INTEGER,
    set() {
      Product.find({
        where: { lineitemId: this.getDataValue('id') }
      })
        .then(function(product) {
          this.setDataValue('total', product.price * this.getDataValue('quantity'));
        });
    }
  },
  name: {
    type: Sequelize.STRING,
    set() {
      Product.find({
        where: { lineitemId: this.getDataValue('id')}
      })
        .then(function(product) {
          this.setDataValue('name', product.name);
        });
    }
  }
});

module.exports = LineItem;
