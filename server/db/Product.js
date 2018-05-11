const conn = require('./conn');
const { Sequelize } = conn;

const Product = conn.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    set(value) {
      let price;
      if(value[0] === '$') {
        price = Number(value.slice(1));
      } else {
        price = Number(value);
      }
      this.setDataValue('price', price);
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: '/images/noImage.jpg'
  },
  displayItem: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Product;
