const conn = require('./conn');
const { Sequelize } = conn;
const { LineItem } = require('./LineItem');

const Order = conn.define('order', {
  cart: Sequelize.BOOLEAN,
  total: {
    type: Sequelize.INTEGER,
    set() {
      LineItem.findAll({
        where: { orderId: this.getDataValue('id')}
      })
        .then(function(lineItems) {
          const total = lineItems.reduce(function(acc, item) {
            return acc + item.total;
          });
          this.setDataValue('total', total);
        });
    }
  }
});

//will have a UserId
module.exports = Order;

//create class method
//line item has productId and an orderId
//order on front end is a map of the line items that have the order id
//add completed: Sequelize.BOOLEAN to model to check if order has been completed
