const conn = require('./conn');
const { Sequelize } = conn;
const LineItem = require('./LineItem');
const Product = require('./Product');

const Order = conn.define('order', {
  cart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  total: Sequelize.INTEGER,
  date: Sequelize.STRING
});

Order.findOrCreateCart = function(user) {
  return Order.findById(user.id)
    .then(cart => {
      if(cart) {
        return cart;
      } else {
        return Order.create()
          .then(order => order.setUser(user));
      }
    });
};

Order.prototype.addToCart = function(quantity, product) {
  return LineItem.createLineItem(quantity, product)
    .then(lineItem => lineItem.setOrder(this))
    .then(() => Order.findOne({
      where: { id: this.id },
      include: [{ model: LineItem, include: [Product] }]
    }))
    .then(order => {
      const total = order.lineitems.reduce((acc, item) => {
        return acc + item.get().subtotal;
      }, 0);
      return order.update({ total });
    })
    .catch(err => console.error(err));
};

Order.prototype.removeFromCart = function(id) {
  LineItem.findById(id)
    .then(lineItem => lineItem.destroy());
};

Order.prototype.checkout = function() {
  return this.update({
    cart: false,
    date: `${new Date().getMonth()}, ${new Date().getDate} ${new Date().getFullYear()}`
  });
};

//will have a UserId
module.exports = Order;

//create class method
//line item has productId and an orderId
//order on front end is a map of the line items that have the order id
//add completed: Sequelize.BOOLEAN to model to check if order has been completed
