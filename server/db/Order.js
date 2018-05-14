const conn = require('./conn');
const { Sequelize } = conn;
const LineItem = require('./LineItem');
const Product = require('./Product');
const User = require('./User')
const nodemailer = require('nodemailer');
const stripe = require("stripe")("sk_test_LqwHQ45LaOBDNsZHnZOyzazP");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'williams.pomona@gmail.com',
    pass: 'graceshopper'
  }
});

const generateEmail = (order, user) => {
  const total = '$' + order.total;
  return `
    <div>
    <h2>${user.firstName}, your Williams-Pomona order has been received!</h2>
    <p>Hello, ${user.firstName},</p>
    <p>Thank you for shopping Williams-Pomona! We've received your order and will let you know as soon as it's shipped.</p>
    <table>
    <tr>
      <th>Quantity</th>
      <th>Product</th>
      <th>Subtotal</th>
    </tr>
    ${order.lineitems.reduce((string, item) => {
    const subtotal = '$' + item.subtotal;
    const row = `
      <tr>
        <td>${item.quantity}</td>
        <td>${item.product.name}</td>
        <td>${subtotal}</td>
      </tr>
      `;
    return string += row;
  }, ``)}
    <tr>
      <td><strong>Total: </strong>${total}</td>
      <td></td>
      <td></td>
    </tr>
    </table>
    <p>Your order will be shipped to:</p>
    <blockquote>
      <p>${ order.name }</p>
      <p>${ order.address }</p>
      <p>${ order.city }, ${ order.state } ${ order.zip }</p>
      <p>${ order.email }</p>
    </blockquote>
    <p>Best wishes,</p>
    <p>Williams-Pomona</p>
    </div>
  `;
};

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
  return stripe.charges.create({
    amount,
    currency: 'usd',
    description: 'Williams-Pomona',
    source: orderInfo.token.id
  })
    .then(() => this.update({
      status: 'processing',
      date: new Date(),
      firstName,
      lastName,
      address,
      city,
      state,
      zip,
      email
    }))
    .then(() => User.findById(userId))
    .then(user => {
      const mailOptions = {
        from: 'williams.pomona@gmail.com',
        to: user.email,
        subject: 'Williams-Pomona: Your order has been received!',
        html: generateEmail(this, user)
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
          console.log(err);
        } else {
          console.log(info);
        }
      });
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
