const expect = require('chai').expect;
const db = require('../../server/db');
const { Product, Category, User, Order, LineItem } = db.models;

// Models tests
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

//Seeding test
describe('seeded data', () => {
  describe('Product data', () => {
    let products;
    beforeEach(() => {
      return Product.findAll({})
        .then(_products => products = _products);
    });
    it('there are 3 products in the database.', () => {
      expect(products.length).to.equal(3);
    });
  });
  let categories;
  beforeEach(() => {
    return Category.findAll({})
      .then(_categories => categories = _categories);
  });
  it('there are 2 categories in the database.', () => {
    expect(categories.length).to.equal(2);
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
          userName: 'bob123',
          email: 'bobby@gmail.com',
          password: 'bobshops'
        })
          .then(user => {
            bob = user;
          });
      });
      it('User has a username and password', ()=> {
        expect(bob.userName && bob.password).to.be.ok;
      });

      it('returns true if the password is correct', () => {
        expect(bob.correctPassword('bobshops')).to.be.equal(true);
      });

      it('returns false if the password is incorrect', () => {
        expect(bob.correctPassword('bobshop')).to.be.equal(false);
      });
    });
  });
});

//LineItem test
describe('LineItem model', () => {
  describe('instanceMethods', () => {
    describe('changeQuantity', () => {
      let lineItem;
      beforeEach(() => {
        return LineItem.create({
          quantity: 3 ,
          productPrice: 10
        })
          .then(_lineItem => {
            lineItem = _lineItem;
          });
      });

      it('has a subtotal field that multiplies price by quantity', () => {
        expect(lineItem.subtotal).to.be.equal(30);
      });

      it('has a changeQuantity method on an instance.', () => {
        expect(lineItem.changeQuantity).to.be.ok;
      });
    });
  });
});

//CART TEST
describe('cart', () => {
  let cart;
  let user;
  beforeEach(() => {
    return User.create({
      firstName: 'Bob',
      lastName: 'Smith',
      email: 'bobby@gmail.com',
      password: 'bobshops'
    })
      .then(_user => {
        user = _user;
        return Order.findOrCreateCart(user);
      })
      .then(_cart => cart = _cart);
  });
  describe('cart', () => {
    it('generates a cart', () => {
      expect(cart).to.be.ok;
    });
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
    it('only generates a cart once', () => {
      Order.findOrCreateCart(user)
        .then(_cart => {
          expect(_cart.id).to.equal(cart.id);
        });
    });
  });
});
