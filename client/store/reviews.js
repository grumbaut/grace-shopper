import axios from 'axios';

const GOT_REVIEWS = 'GOT_REVIEWS';

const addReviewsToStore = reviews => {
  const action = { type: GOT_REVIEWS, reviews };
  return action;
};

export const getReviews = () => (
  dispatch => (
    axios.get('/api/reviews')
      .then(res => res.data)
      .then(reviews => dispatch(addReviewsToStore(reviews)))
  )
);

const reducer = (state = [], action) => {
  switch (action.type) {
  case GOT_REVIEWS:
    return action.reviews;
  default:
    return state;
  }
};

export default reducer;
