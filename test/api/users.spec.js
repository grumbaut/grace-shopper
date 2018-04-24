// ED - START OF EDITS  
// 
//const server = require('../../server.js');

var request = require('supertest');
describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = require('../../server.js');
  });
  afterEach(function () {
    server.close();
  });
  it('responds to /', function testSlash(done) {
  request(server)
    .get('/')
    .expect(200, done);
  });
  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});



// const { expect } = require('chai');
// const request = require('supertest');
// const test = require('tape');
// const db = require('../../server/db');
// const { Product, Category, User } = db.models;
//  const app = require('../../server.js');

// describe('Test the root path', () => {
//   test('It should response the GET method', (done) => {
//       request(app)
//       .get('/')
//       .then((response) => {
//           expect(response.statusCode).to.be.equal(200);
//       })
//       .end((err, res)=> {
//         done.end();
//       });
//   });
// });

//ED - END OF EDITS


//User routes test
// describe('User routes', () => {
//   beforeEach(() => {
//    return db.syncAndSeed();
//   });

//   describe('/api/users/', () => {
//     const moesEmail = 'moe@gmail.com';
//     var server;
//     beforeEach(function () {
//      server = require('../../server.js');
//     });
//     afterEach(function (done) {
//       server.close(done);
//     });
//     beforeEach(() => {
//       return User.create({
//         firstName: 'Moe',
//         lastName: 'Stevens',
//         userName: 'moe123',
//         email: 'moe@gmail.com',
//         password: 'moeshops'
//       });
//     });

//     it('GET /api/users', () => {
//       return request(server)
//         .get('/api/users')
//         .expect(200)
//         .then(res => {
//           expect(res.body).to.be.an('array');
//           expect(res.body[0].email).to.be.equal(moesEmail);
//         });
//     });
//   });
// });
