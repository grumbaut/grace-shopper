const expect = require('chai').expect;
const db = require('../../server/db');
const { Product, Category, User, Order, LineItem } = db.models;

// Models tests
describe('models', () => {
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
    it('there are 48 products in the database.', () => {
      expect(products.length).to.equal(48);
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
      return db.syncAndSeed()
        .then(() => User.findAll()
          .then(_users => users = _users));
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
      it('User has a email and password', ()=> {
        expect(bob.email && bob.password).to.be.ok;
      });

      it('Has a full name from the getter method.', () => {
        expect(bob.name).to.be.equal('Bob Smith');
      });

    });
  });
});

//LineItem test
describe('LineItem model', () => {
  describe('classMethods', () => {
    describe('changeQuantities', () => {
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
        expect(lineItem.subtotal).to.be.equal(30.00);
      });

      it('has a changeQuantities method.', () => {
        expect(LineItem.changeQuantities).to.be.ok;
      });
      it('changeQuantities changes quantity', () => {
        lineItem.update({ quantity: 5 })
          .then(lineItem => {
            expect(lineItem.quantity).to.equal(5);
          });
      });
      it('changeQuantities changes subtotal', () => {
        lineItem.update({ quantity: 6})
          .then(lineItem => {
            expect(lineItem.subtotal).to.equal(60);
          });
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
        return Order.findOrCreateCart(user.id);
      })
      .then(_cart => {
        cart = _cart;
      });
  });
  describe('cart', () => {
    it('generates a cart', () => {
      expect(cart).to.be.ok;
    });
    it('has a cart status of true', () => {
      expect(cart.status).to.equal('cart');
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
    it('checkout method sets order status to processing', () => {
      const orderInfo = { token: {
        id: 'tok_visa'
      },
      shippingInfo: {
        firstName: 'Alice',
        lastName: 'Buyer',
        address: '123 Buyer Way',
        city: 'New York',
        state: 'NY',
        zip: '10012',
        email: 'alice@wonderland.com'
      }
      };
      Product.findById(1)
        .then(product => cart.addToCart(3, product))
        .then(_cart => _cart.checkout(user.id, orderInfo))
        .then(_cart => expect(_cart.status).to.equal('processing'));
    });
    it('only generates a cart once', () => {
      Order.findOrCreateCart(user.id)
        .then(_cart => {
          expect(_cart.id).to.equal(cart.id);
        });
    });
  });
});
