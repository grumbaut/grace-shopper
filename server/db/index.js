const conn = require('./conn');
const Category = require('./Category');
const Product = require('./Product');
const User = require('./User');
const Order = require('./Order');
const LineItem = require('./LineItem');
const Review = require('./Review');
const fake = require('faker');

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

// const reviews = [
//   { content: fake.lorem.paragraph(), star: 5 },
//   { content: fake.lorem.paragraph(), star: 4 },
//   { content: fake.lorem.paragraph(), star: 3 },
//   { content: fake.lorem.paragraph(), star: 1 }
// ]


const syncAndSeed = ()=>{
  return conn.sync({ force: true })
    .then(() => {
      return Promise.all([
        Category.create({ name:'Kitchen Supplies'}),
        Category.create({ name: 'Decorative'}),
        Product.create({ name: 'Mixing Bowl', description: 'Hand carved wooden mixing bowl.', price: 28.00, imageUrl: '/images/redmixingbowlset.jpg' }),
        Product.create({ name: 'Vase', description: 'Porcelain longnecked vase, ideal for roses.', imageUrl: '/images/vase.jpg', price: 31.95 }),
        Product.create({ name: 'Vanilla Diffuser', description: 'A room diffuser with reeds and vanilla oil', imageUrl: '/images/vanilladiffuser.jpg', price: 6.85 }),
        User.create({firstName: 'Alice', lastName: 'Buyer', email: 'alice@wonderland.com', isAdmin: 'false', password: 'ALICE'}),
        Review.create({ content: fake.lorem.paragraph(), rating: 5 }),
        Review.create({ content: fake.lorem.paragraph(), rating: 4 }),
        Review.create({ content: fake.lorem.paragraph(), rating: 3 }),
        Review.create({ content: fake.lorem.paragraph(), rating: 1 }),
        User.create({firstName: 'Bob', lastName: 'Bill', email: 'bob@wonderland.com', isAdmin: 'false', password: 'BOB'}),
        User.create({firstName: 'Cat', lastName: 'Purchase', email: 'cat@wonderland.com', isAdmin: 'false', password: 'CAT'}),
      ]);
    })
    .then(([ category1, category2, product1, product2, product3, user1, rev1, rev2, rev3, rev4, user2, user3])=>{
      return Promise.all([
        product1.setCategory(category1),
        product2.setCategory(category2),
        product3.setCategory(category2),
        Order.findOrCreateCart(user1),
        rev1.setUser(user1),
        rev1.setProduct(product1),
        rev2.setUser(user2),
        rev2.setProduct(product1),
        rev3.setUser(user3),
        rev3.setProduct(product1),
        rev4.setUser(user3),
        rev4.setProduct(product2)
      ]);
    })
    .then(([product1, product2, product3, order]) => order.addToCart(3, product1))
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
