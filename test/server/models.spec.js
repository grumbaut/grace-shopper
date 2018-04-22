const expect = require('chai').expect;
const db = require('../../server/db');
const { Product, Category, User } = db.models;

//Models tests, do they exist?
describe('models', () => {
  beforeEach(() => {
    return db.syncAndSeed();
  });
  describe('User', () => {
    it('model User exists.', () => {
      expect(User).to.be.ok;
    });
  });
  describe('Product', () => {
    it('model Product exists.', () => {
      expect(Product).to.be.ok;
    });
  });
  describe('Category', () => {
    it('model Category exists.', () => {
      expect(Category).to.be.ok;
    });
  });
});

//Seeding test, do we have all of our data seeding?
describe('seeded data', () => {
  describe('Product data', () => {
    let products;
    beforeEach(() => {
      return Product.findAll({})
        .then(_products => products = _products);
    });
    it('there is 1 product in the database.', () => {
      expect(products.length).to.equal(1);
    });
  });
  let products;
  beforeEach(() => {
    return Product.findAll({})
      .then(_products => products = _products);
  });
  it('there is 1 product in the database.', () => {
    expect(products.length).to.equal(1);
  });
  describe('User data', () => {
    let users;
    beforeEach(() => {
      return User.findAll({})
        .then(_users => users = _users);
    });
    it('we have 3 users in the database.', () => {
      expect(users.length).to.equal(3);
    });
  });
});

//User model test
describe('User model', () => {
  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let bob;

      beforeEach(() => {
        return User.create({
          firstName: 'Bob',
          lastName: 'Smith',
          email: 'bobby@gmail.com',
          password: 'bobshops'
        })
          .then(user => {
            bob = user;
          });
      });

      it('returns true if the password is correct', () => {
        expect(bob.correctPassword('bobshops')).to.be.equal(true);
      })

      it('returns false if the password is incorrect', () => {
        expect(bob.correctPassword('bobshop')).to.be.equal(false);
      });
    });
  });
})

//AUTHENTICATION TESTS

//This is how Prof did it, but if you console users, you only get a list of products (no categories even)
    //   .then( users => {
    //     userMap = users.reduce((memo, user)=> {
    //       memo[user.firstName] = user
    //       return memo;
    //     }, {});
    //     });


describe ('authentication', () => {
  let users;
  beforeEach (()=> {
    return db.syncAndSeed()
      .then(User.findAll({}))
      .then(_users => users = _users)
  });
  describe ('seeded data', ()=> {
    it('Alice, Bob, Cat exist', ()=> {
      expect (users[Alice].firstName.to.be.equal(3))
    })
  });
  describe('authenticate', ()=> {
    xit('authenticating with correct credentials returns a token', ()=> {});
    xit('authenticating with incorrect credentials will throw an error with a 401 status', ()=> {})
  });
  describe('exchanging a token', ()=> {
    xit('a valid token which matches a user returns the user', ()=> {});
    xit('a valid token which does not match a user will return an error with a 401 status', ()=> {})
    xit('a invalid token will return an error with a 401 status', ()=> {})
    xit('a valid token with the wrong data type for a userId with will return a 401 status', ()=> {})
  });
})
