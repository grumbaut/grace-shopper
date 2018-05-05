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
});

// Reviews
// All reviews must belong to a product
// All reviews must belong to a user
// All reviews must be at least X characters
// ...be able to leave reviews for products (including text and a 5-star rating), so that I can share my experiences with other visitors

module.exports = Review;
