const conn = require('./conn');
const { Sequelize } = conn;

const Category = conn.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Category;
