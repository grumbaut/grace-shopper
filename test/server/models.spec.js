const expect = require('chai').expect;
const db = require('../../server/db');
const { Product, Category, User, Order, LineItem } = db.models;

// Models tests, do they exist?
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

//CART TEST
describe('cart', () => {
  let cart;
  beforeEach(() => {
    return User.create({
      firstName: 'Bob',
      lastName: 'Smith',
      email: 'bobby@gmail.com',
      password: 'bobshops'
    })
      .then(user => {
        return Order.findOrCreateCart(user);
      })
      .then(_cart => cart = _cart);
  });
  describe('cart', () => {
    it('has a cart status of true', () => {
      expect(cart.cart).to.equal(true);
    });
    it('can add products to cart', () => {
      let product;
      Product.findById(1)
        .then(_product => {
          product = _product;
          return cart.addToCart(2, product);
        })
        .then(updatedCart => {
          expect(updatedCart.lineitems[0].product.name).to.equal(product.name);
        });
    });
    it('checkout method sets cart status to false', () => {
      cart.checkout()
        .then(_cart => cart = _cart);
      expect(cart.cart).to.equal(false);
    });
  });
});

//AUTHENTICATION TESTS
let userMap;
const jwt = require('jwt-simple');
const KEY = process.env.JWT_KEY;

describe('authentication', () => {
  beforeEach(() => {
    return User.findAll({})
      .then(users => {
        userMap = users.reduce((memo, user) => {
          memo[user.firstName] = user;
          return memo;
        }, {});
      });
  });
  describe('seeded data', () => {
    it('Alice, Bob, Cat exist', () => {
      expect(userMap.Alice.firstName).to.be.equal('Alice');
    });
  });

  describe('authenticate', () => {
    it('authenticating with correct credentials returns a token', () => {
      const Alice = userMap.Alice;
      const expectedToken = jwt.encode({
        id: Alice.id
      }, KEY);
      return User.authenticate({
        email: Alice.email,
        password: Alice.password
      })
        .then(token => expect(token).to.equal(expectedToken));
    });

    it('authenticating with incorrect credentials will throw an error with a 401 status', () => {
      const Alice = userMap.Alice;
      return User.authenticate({
        email: Alice.email,
        password: 'bad password'
      })
        .then(() => { throw 'no!!' })
        .catch(ex => expect(ex.status).to.equal(401));
    });
  });

  describe('exchanging a token', () => {
    it('a valid token which matches a user returns the user', () => {
      const Alice = userMap.Alice;
      const token = jwt.encode({
        id: Alice.id
      }, KEY);
      return User.exchangeTokenForUser(token)
        .then(user => expect(user.email).to.equal(Alice.email));
    });

    it('a valid token which does not match a user will return an error with a 401 status', () => {
      const token = jwt.encode({
        id: User.build().id
      }, KEY);
      return User.exchangeTokenForUser(token)
        .then(()=> { throw 'no!';})
        .catch(ex => expect(ex.status).to.equal(401));
    });

    it('a invalid token will return an error with a 401 status', () => {
      const token = jwt.encode({
        id: User.build().id
      }, 'some silly key');
      return User.exchangeTokenForUser(token)
      .then(()=> {throw 'no!';})
      .catch(ex => expect(ex.status).to.equal(401));
    });

    it('a valid token with the wrong data type for a userId with will return a 401 status', () => {
      const token = jwt.encode({
        id: User.build().id
      }, 'some silly key');
      return User.exchangeTokenForUser(token)
      .then(()=> {throw 'no!';})
      .catch(ex => expect(ex.status).to.equal(401));
    });
  });
});
