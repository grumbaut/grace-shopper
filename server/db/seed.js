const conn = require('./conn');
const Category = require('./Category');
const Product = require('./Product');
const User = require('./User');
const Order = require('./Order');
const LineItem = require('./LineItem');
const Review = require('./Review');
const fake = require('faker');

const categories = [
  {
    name: 'Kitchen Supplies'
  },
  {
    name: 'Decorative'
  }
];

const products = [
  {
    name: 'Mixing Bowl',
    description: 'Hand carved wooden mixing bowl.',
    price: 28.00,
    imageUrl: '/images/redmixingbowlset.jpg',
    categoryId: 1
  },
  {
    name: 'Vase',
    description: 'Porcelain longnecked vase, ideal for roses.',     
    price: 31.95,
    imageUrl: '/images/vase.jpg',
    categoryId: 2
  },
  {
    name: 'Vanilla Diffuser',
    description: 'A room diffuser with reeds and vanilla oil',    
    price: 6.85,
    imageUrl: '/images/vanilladiffuser.jpg',
    categoryId: 2
  }
];

const users = [
  {
    firstName: 'Alice',
    lastName: 'Buyer',
    email: 'alice@wonderland.com',
    isAdmin: 'false',
    password: 'ALICE'
  },
  {
    firstName: 'Bob',
    lastName: 'Bill',
    email: 'bob@wonderland.com',
    isAdmin: 'false',
    password: 'BOB'
  },
  {
    firstName: 'Cat',
    lastName: 'Purchase',
    email: 'cat@wonderland.com',
    isAdmin: 'false',
    password: 'CAT'
  }
];

const reviews = [
  {
    content: fake.lorem.paragraph(),
    rating: 5,
    productId: 1,
    userId: 1
  },
  {
    content: fake.lorem.paragraph(),
    rating: 4,
    productId: 1,
    userId: 2
  },
  {
    content: fake.lorem.paragraph(),
    rating: 3,
    productId: 2,
    userId: 3
  },
  {
    content: fake.lorem.paragraph(),
    rating: 1,
    productId: 3,
    userId: 1
  }
];

const seed = () => {
  return Promise.all(categories.map( category => Category.create(category)))
  .then(() => {
    return Promise.all(products.map( product => Product.create(product)))
  })
  .then(() => {
    return Promise.all(users.map( user => User.create(user)))
  })
  .then(() => {
    return Promise.all(reviews.map( review => Review.create(review)))
  })
  .then(() => User.findById(1))
  .then( user => Promise.all([
    Order.findOrCreateCart(user.id),
    Product.findById(3)
  ]))
  .then(([order, product])=> order.addToCart(1, product))
  .catch( err => {throw err})
}


module.exports = seed;
