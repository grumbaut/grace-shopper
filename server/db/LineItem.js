const conn = require('./conn');
const { Sequelize } = conn;

const LineItem = conn.define('lineitem', {
  quantity: Sequelize.INTEGER
});
//will have a productId to get Product name, Product price

module.exports = LineItem;
