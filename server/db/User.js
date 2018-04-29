const conn = require('./conn');
const { Sequelize } = conn;
const KEY = process.env.JWT_KEY;
const jwt = require('jwt-simple');

const User = conn.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  userName: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING
  }
},{
  getterMethods: {
    name() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
});

User.authenticate = function(credentials){
  const { email, password } = credentials;
  return this.findOne({
    where: {
      email,
      password
    }
  })
    .then( user => {
      if(user) {
        return jwt.encode({ id: user.id }, KEY);
      }
      throw { status: 401 };
    })
    .catch(err => {
      throw err;
    });
};

User.exchangeTokenForUser = function(token){
  try {
    const id = jwt.decode(token, KEY).id;
    return User.findById(id)
      .then( user => {
        if(user)
          return user;
        throw { status: 401 }
      })
      .catch(()=> {throw { status: 401 }});
  }
  catch(ex){
    return Promise.reject({ status: 401 });
  }
};

User.prototype.correctPassword = function(password) { //this is a placeholder!!
  return password === 'bobshops' ? true : false;
};

module.exports = User;
