const expect = require('chai').expect;
const db = require('../../server/db');
const { Product, Category, User } = db.models;

describe('models', ()=> {
  beforeEach(()=> {
    return db.syncAndSeed();
  });
  describe('User',()=> {
    it('exists',()=>{
      expect(User).to.be.ok;
    });
  });
  describe('Product',()=> {
    it('exists',()=>{
      expect(Product).to.be.ok;
    });
  });
  describe('Category',()=> {
    it('exists',()=>{
      expect(Category).to.be.ok;
    });
  });
});
// describe('models', ()=> {
//   beforeEach(()=> {
//     return db.syncAndSeed();
//   });
//   describe('seeded data', ()=> {
//     let products;
//     beforeEach(()=> {
//       return Product.findAll({})
//       .then( _products => products = _products);
//     });
//     it('there is 1 product in the database', ()=> {
//       expect(products.length).to.equal(1);
//     });
//     describe('User data', ()=> {
//       let users;
//       beforeEach(()=> {
//         return User.findAll({})
//         .then( _users => users = _users);
//       });
//       it('we have users.', ()=> {
//         expect(users).to.be.ok;
//       });
//     });
//   });
// });

// describe('Products', function() {
//   describe('Number of products', function() {
//     it('should return 3 when searching database for products', function(){
//       assert.equal(-1, Product.findAll().length);
//     });
//   });
// });

// describe('Categories', function() {
//   describe('Number of categories', function() {
//     it('should return 3 when searching database for categories', function(){
//       assert.equal(-1, Category.findAll().length);
//     });
//   });
// });

// describe('Users', function() {
//   describe('Number of users', function() {
//     it('should return 3 when searching database for users', function(){
//       assert.equal(-1, User.findAll().length);
//     });
//   });
// });

