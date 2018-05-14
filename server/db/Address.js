const conn = require('./conn');
const { Sequelize } = conn;

const Address = conn.define('address', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  address: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  zip: Sequelize.STRING,
  email: Sequelize.STRING
});

module.exports = Address;
