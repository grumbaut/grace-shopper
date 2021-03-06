const { expect } = require('chai');
const request = require('supertest');
const db = require('../../server/db');
const { User } = db.models;
const app = require('../../app.js');

//Root route
describe('Loading express', ()=> {
  it('It responds to /', (done)=> {
  request(app)
    .get('/')
    .expect(200, done);
  });
  it('Sends 404 for everything else', (done)=> {
    request(app)
      .get('/foo/bar')
      .expect(404, done);
  });
});


//User routes test, needs to be logged in as admin.

describe('User routes', () => {
    const moesEmail = 'moe@gmail.com';
    let token;
    beforeEach(() => {
      return db.syncAndSeed()
      .then(()=>{
          return User.create({
        firstName: 'Moe',
        lastName: 'Stevens',
        userName: 'moe123',
        email: 'moe@gmail.com',
        password: 'moeshops'
      });
      })
      .then(()=>{  return User.authenticate({
        email: 'alice@wonderland.com',
        password: 'ALICE'
      });
    })
    .then(_token => token = _token);
    });

    it('GET /api/users returns all users in the database', () => {
      return request(app)
        .get('/api/users')
        .set('authorization', token)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.equal(4);
        });
    });

    it('It has data on a newly created user', () => {
      return request(app)
        .get('/api/users')
        .set('authorization', token)
        .expect(200)
        .then(res => {
          expect(res.body.find(user=> user.firstName === "Moe").email).to.be.equal(moesEmail);
        });
    });
});

//Product and Category routes
describe('Product routes', ()=> {
  it('api/products loads all the products', ()=>{
    return request(app)
    .get('/api/products')
    .then( res => {
      expect(res.body).to.be.ok;
      expect(res.body.length).to.be.equal(48);
    });
  });

  it('It has a product detail page', ()=> {
    return request(app)
    .get('/api/products/1')
    .then( res => {
      expect(res).to.be.ok;
    });
  });
});

describe('Category routes', ()=> {
  it('api/categories loads all the categories', ()=>{
    return request(app)
    .get('/api/categories')
    .then( res => {
      expect(res.body).to.be.ok;
      expect(res.body.length).to.be.equal(2);
    });
  });
});
