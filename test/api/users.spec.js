//ALANS BRAINSTORMING
//var app = require('../../server.js');


const { expect } = require('chai');
const request = require('supertest');
const test = require('tape');
const db = require('../../server/db');
const { Product, Category, User } = db.models;
const app = require('../../server.js');

//User routes test
describe('User routes', () => {
  beforeEach(() => {
   return db.syncAndSeed();
  });

  describe('/api/users', () => {
    const moesEmail = 'moe@gmail.com';
    // var server;
    // beforeEach(function () {
    //  server = require('../../server.js');
    // });
    // afterEach(function (done) {
    //   server.close(done);
    // });
    beforeEach(() => {
      return User.create({
        firstName: 'Moe',
        lastName: 'Stevens',
        userName: 'moe123',
        email: 'moe@gmail.com',
        password: 'moeshops'
      });
    });

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[3].email).to.be.equal(moesEmail);
        });
    });
  });
});
