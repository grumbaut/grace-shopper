const conn = require('./conn');
const { Sequelize } = conn;

const PromoCode = conn.define('promoCode', {
  name: {
    type: Sequelize.STRING,
  },
  percent: {
    type: Sequelize.FLOAT,
  }
});

module.exports = PromoCode;
