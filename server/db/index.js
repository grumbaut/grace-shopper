const conn = require('./conn');
const Category = require('./Category');
const Product = require('./Product');
const User = require('./User');
const Order = require('./Order');
const LineItem = require('./LineItem');

Product.belongsTo(Category);
Product.hasMany(LineItem);
Category.hasMany(Product);
LineItem.belongsTo(Order);
LineItem.belongsTo(Product);
Order.hasMany(LineItem);
Order.belongsTo(User);
User.hasMany(Order);


const syncAndSeed = ()=>{
  return conn.sync({ force: true })
    .then(() => {
      return Promise.all([
        Category.create({ name:'Kitchen Supplies'}),
        Product.create({ name: 'Mixing Bowl', description: 'Hand carved wooden mixing bowl.', price: 28.00 }),
        User.create({firstName: 'Alice', lastName: 'Buyer', email: 'alice@wonderland.com', isAdmin: 'false', password: 'ALICE'}),
        User.create({firstName: 'Bob', lastName: 'Bill', email: 'bob@wonderland.com', isAdmin: 'false', password: 'BOB'}),
        User.create({firstName: 'Cat', lastName: 'Purchase', email: 'cat@wonderland.com', isAdmin: 'false', password: 'CAT'}),
      ]);
    })
    .then(([ category, product, user1])=>{
      return Promise.all([
        product.setCategory(category),
        Order.findOrCreateCart(user1)
      ]);
    })
    .then(([product, order]) => order.addToCart(3, product))
};

module.exports = {
  syncAndSeed,
  models: {
    Category,
    Product,
    User,
    LineItem,
    Order
  }
};
