const nodemailer = require('nodemailer');
const User = require('./User');
const LineItem = require('./LineItem');
const Product = require('./Product');
const Order = require('./Order');

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

const sendEmail = (user, order) => {
  const mailOptions = {
    from: 'williams.pomona@gmail.com',
    to: user.email,
    subject: 'Williams-Pomona: Your order has been received!',
    html: generateEmail(order, user)
  };
  transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
