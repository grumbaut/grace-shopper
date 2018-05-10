import axios from 'axios';

const GOT_REVIEWS = 'GOT_REVIEWS';
const CREATE_REVIEW = 'CREATE_REVIEW';
const DELETE_REVIEW = 'DELETE_REVIEW';
const UPDATE_REVIEW = 'UPDATE_REVIEW';

const addReviewsToStore = reviews => {
  const action = { type: GOT_REVIEWS, reviews };
  return action;
};

const createReviewInStore = review => {
  const action = { type: CREATE_REVIEW, review };
  return action;
};

const deleteReviewInStore = review => {
  const action = { type: DELETE_REVIEW, review };
  return action;
};

const updateReviewInStore = review => {
  const action = { type: UPDATE_REVIEW, review };
  return action;
};


const reducer = (state = [], action) => {
  switch (action.type) {
  case GOT_REVIEWS:
    return action.reviews;
  case CREATE_REVIEW:
    return [...state, action.review];
  case DELETE_REVIEW:
    return state.filter(review => review.id !== action.review.id);
  case UPDATE_REVIEW:
    return state.map( review => review.id === action.review.id ? action.review : review);
  default: return state;
  }
};

export const getReviews = () => (
  dispatch => (
    axios.get('/api/reviews')
      .then(res => res.data)
      .then(reviews => dispatch(addReviewsToStore(reviews)))
  )
);

export const deleteReview = (review, history) => (
  dispatch => (
    axios.delete(`api/reviews/${review.id}`)
      .then( () => dispatch(deleteReviewInStore(review)))
      .then( () => history.push(`/products/${review.productId}`))
  )
);

export const saveReview = (review, history) => (
  review.id ? (
    dispatch => (
      axios.put(`api/reviews/${review.id}`, review)
        .then( res => res.data)
        .then( updatedReview => dispatch(updateReviewInStore(updatedReview)))
        .then( () => history.push(`/products/${review.productId}`))
    )
  ) : (
    dispatch => (
      axios.post(`api/reviews`, review)
        .then(res => res.data)
        .then( newReview => dispatch(createReviewInStore(newReview)))
        .then( () => history.push(`/products/${review.productId}`))
    ))
);

export default reducer;

