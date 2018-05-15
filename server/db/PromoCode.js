const conn = require('./conn');
const { Sequelize } = conn;

const PromoCode = conn.define('promoCode', {
  name: {
    type: Sequelize.STRING,
  },
  discount: {
    type: Sequelize.FLOAT,
  },
  password: {
     type: Sequelize.STRING
  },
  valid:  {
      type: Sequelize.BOOLEAN,
      defaultValue: true
  }
});

module.exports = PromoCode;
