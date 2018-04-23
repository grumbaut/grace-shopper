const conn = require('./conn');
const { Sequelize } = conn;
const LineItem = require('./LineItem');

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

Order.prototype.addToCart = function(id, quantity, product) {
  return Promise.all([
    Order.findById(id),
    LineItem.createLineItem(quantity, product)
  ])
    .then(([order, lineItem]) => {
      return lineItem.setOrder(order);
    })
    .then(() => Order.findOne({
      where: { id },
      include: [{ model: LineItem }]
    }))
    .catch(err => console.error(err));
};

Order.prototype.checkout = function() {
  this.update({
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
