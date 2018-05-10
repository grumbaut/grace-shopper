const conn = require('./conn');
const { Sequelize } = conn;
const User = require('./User');

const Review = conn.define('review', {
  content: {
    type: Sequelize.TEXT
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {min: 1, max: 5}
  }
}, {
  defaultScope: {
    include: [
      { model: User }
    ]
  }
}
);


module.exports = Review;
