const conn = require('./conn');
const Category = require('./Category');
const Product = require('./Product');
const User = require('./User');
const Order = require('./Order');
const LineItem = require('./LineItem');
const Review = require('./Review');
const fake = require('faker');
<<<<<<< HEAD
const seed = require('./seed');
=======
const productArray = require('./seedProducts');
>>>>>>> 35b89fe09c07cd126b3877034fc776a17e3fab19

Product.belongsTo(Category);
Product.hasMany(LineItem);
Category.hasMany(Product);
LineItem.belongsTo(Order);
LineItem.belongsTo(Product);
Order.hasMany(LineItem);
Order.belongsTo(User);
User.hasMany(Order);
Review.belongsTo(Product);
Product.hasMany(Review);
Review.belongsTo(User);
User.hasMany(Review);

const syncAndSeed = () => {
  return conn.sync({ force: true })
  .then(() => seed())
  .catch(err => {
    throw err;
  });
};

module.exports = {
  syncAndSeed,
  models: {
    Category,
    Product,
    User,
    LineItem,
    Order,
    Review
  }
};
