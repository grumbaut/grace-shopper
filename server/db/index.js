const conn = require('./conn');
const Category = require('./Category');
const Product = require('./Product');
const User = require('./User');
const Order = require('./Order');
const LineItem = require('./LineItem');
const faker = require('faker');

Product.belongsTo(Category);
Category.hasMany(Product);
LineItem.belongsTo(Order);
LineItem.hasOne(Product);
Order.hasMany(LineItem);
Order.belongsTo(User);


const fakeUser = ()=> {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email()
  };
};


const syncAndSeed = ()=>{
  return conn.sync({ force: true })
    .then(()=>{
      return Promise.all([
        Category.create({ name:'Kitchen Supplies'}),
        Product.create({ name: 'Mixing Bowl', description: 'Hand carved wooden mixing bowl.', price: 28.00 }),
        User.create(fakeUser()),
        User.create(fakeUser()),
        User.create(fakeUser())
      ]);
    })
    .then(([ category1, product1])=>{
      return Promise.all([
        product1.setCategory(category1)
      ]);
    })
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
