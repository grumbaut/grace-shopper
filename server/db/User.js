const conn = require('./conn');
const { Sequelize } = conn;

const User = conn.define('user', {
  // id: {
  //   type: Sequelize.UUID,
  //   defaultValue: Sequelize.UUIDV4, 
  //   primaryKey: true
  // },
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

User.prototype.correctPassword = function(password) { //this is a placeholder!!
  return password === 'bobshops' ? true : false;
};

module.exports = User;
