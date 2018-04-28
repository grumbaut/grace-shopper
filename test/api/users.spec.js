const { expect } = require('chai');
const request = require('supertest');
const db = require('../../server/db');
const { Product, Category, User } = db.models;
const app = require('../../app.js');

//Root route
describe('loading express', function () {
  let server;
  beforeEach(function () {
    server = require('../../app.js');
  });
  afterEach(function () {
    server.close();
  });
  it('responds to /', (done)=> {
  request(server)
    .get('/')
    .expect(200, done);
  });
  it('404 everything else', (done)=> {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});

//User routes test
describe('User routes', () => {
  describe('/api/users', () => {
    const moesEmail = 'moe@gmail.com';
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
      });
    });

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[2].email).to.be.equal(moesEmail);
        });
    });
  });
});

