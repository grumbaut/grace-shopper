const conn = require('./conn');
const { Sequelize } = conn;
const User = require('./User');

const Review = conn.define('review', {
  content: {
    type: Sequelize.TEXT
  }
}, {
    defaultScope: {
      include: [
        { model: User }
      ]
    }
});

// Review.createReview = function(comment, user, product) {
//   return Review.create({
//     comment
//   })
//   .then(review => {
//     return Promise.all([
//       review.setUser(user),
//       review.setProduct(product)
//     ]);
//   })
//   .catch(err => {
//     throw err;
//   });
// };

module.exports = Review;
