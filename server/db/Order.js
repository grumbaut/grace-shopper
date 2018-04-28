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
  const id = user.id ? user.id : 0;
  return this.findOne({
    where: { userId: id }
  })
    .then(cart => {
      if(cart) {
        return cart;
      } else {
        return this.create()
          .then(order => order.setUser(user));
      }
    })
    .catch(err => {
      throw err;
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
    .catch(err => {
      throw err;
    });
};

Order.prototype.removeFromCart = function(id) {
  LineItem.findById(id)
    .then(lineItem => lineItem.destroy())
    .catch(err => {
      throw err;
    });
};

Order.prototype.checkout = function() {
  return this.update({
    cart: false,
    date: `${new Date().getMonth()}, ${new Date().getDate} ${new Date().getFullYear()}`
  })
    .catch(err => {
      throw err;
    });
};

module.exports = Order;
