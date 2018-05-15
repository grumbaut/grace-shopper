const conn = require('./conn');
const { Sequelize } = conn;
const LineItem = require('./LineItem');
const Product = require('./Product');
const User = require('./User');
const sendEmail = require('./generateEmail');
const charge = require('./stripe');

const Order = conn.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'cart'
  },
  date: Sequelize.DATE,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  address: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  zip: Sequelize.STRING,
  email: Sequelize.STRING,
  discount: {
    type: Sequelize.FLOAT,
    defaultValue: 1
  }
}, {
  getterMethods: {
    total() {
      let total = this.lineitems.reduce((acc, item) => {
        return acc + Number(item.get().subtotal);
      }, 0);
      total = total*this.discount
      return total.toFixed(2);
    },
    name() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
});

Order.findOrCreateCart = function(userId) {
  return this.findOne({
    where: { userId, status: 'cart' },
    include: [{ model: LineItem, include: [Product]}]
  })
    .then(cart => {
      if(cart) {
        return cart;
      } else {
        return this.create({
          userId
        });
      }
    })
    .then(cart => this.findById(cart.id, {
      include: [{
        model: LineItem,
        include: [Product]
      }]
    }));
};

Order.prototype.addToCart = function(quantity, product) {
  return LineItem.updateOrCreateLineItem(this, quantity, product)
    .then(() => Order.findById(this.id, {
      include: [{
        model: LineItem,
        include: [Product]
      }]
    }));
};

Order.prototype.checkout = function(userId, orderInfo) {
  const { firstName, lastName, address, city, state, zip, email } = orderInfo.shippingInfo;
  const amount = this.total.split('.').join('');
  return this.update({
    status: 'processing',
    date: new Date(),
    firstName,
    lastName,
    address,
    city,
    state,
    zip,
    email
  })
    .then(() => Promise.all([
      User.findById(userId),
      Order.findById(this.id, {
        include: [{
          model: LineItem,
          include: [Product]
        }]
      })
    ]))
    .then(([user, order]) => {
      sendEmail(user, order);
      charge(orderInfo.token.id, amount);
      return this;
    });
};

Order.prototype.cancelOrder = function() {
  return this.update({
    status: 'cancelled'
  })
    .then(order => Order.findById(order.id, {
      include: [{
        model: LineItem,
        include: [Product]
      }]
    }));
};

module.exports = Order;
