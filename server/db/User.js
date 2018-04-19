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

module.exports = User;
