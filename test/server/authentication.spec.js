const expect = require('chai').expect;
const db = require('../../server/db');
const { User } = db.models;

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
        .then(() => { throw 'no!!'; })
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
