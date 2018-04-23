const conn = require('./conn');
const Category = require('./Category');
const Product = require('./Product');
const User = require('./User');
const Order = require('./Order');
const LineItem = require('./LineItem');
// const faker = require('faker');

Product.belongsTo(Category);
Category.hasMany(Product);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
Order.belongsTo(User);


// const fakeUser = ()=> {
//   return {
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     email: faker.internet.email()
//   };
// };


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
    .then(([product, order]) => order.addToCart(order.id, 3, product))
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
