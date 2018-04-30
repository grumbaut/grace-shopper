const conn = require('./conn');
const { Sequelize } = conn;

const Review = conn.define('review', {
  comment: {
    type: Sequelize.TEXT
  }
});

Review.createReview = function(comment, user, product) {
  return Review.create({
    comment
  })
  .then(review => {
    return Promise.all([
      review.setUser(user),
      review.setProduct(product)
    ]);
  })
  .catch(err => {
    throw err;
  });
};

module.exports = Review;
