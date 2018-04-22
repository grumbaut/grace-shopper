const conn = require('./conn');
const { Sequelize } = conn;

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
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password');
    }
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
