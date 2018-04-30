const conn = require('./conn');
const { Sequelize } = conn;
const LineItem = require('./LineItem');
const Product = require('./Product');

const Order = conn.define('order', {
  cart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  date: Sequelize.STRING,
  address: Sequelize.STRING,
  name: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  zip: Sequelize.STRING
}, {
  getterMethods: {
    total() {
      const total = this.lineitems.reduce((acc, item) => {
        return acc + Number(item.get().subtotal);
      }, 0);
      return total.toFixed(2);
    }
  }
});

Order.findOrCreateCart = function(user) {
  const id = user.id ? user.id : 0;
  return this.findOne({
    where: { userId: id },
    include: [{ model: LineItem, include: [Product]}]
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
  return LineItem.updateOrCreateLineItem(this, quantity, product)
    .then(() => Order.findById(this.id, {
      include: [{
        model: LineItem,
        include: [Product]
      }]
    }))
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
