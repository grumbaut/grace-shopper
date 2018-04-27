import axios from 'axios';

const GOT_CART = 'GOT_CART';

const gotCart = cart => {
  const action = { type: GOT_CART, cart };
  return action;
};

export const getCart = user => (
  dispatch => (
    axios.post(`/api/users/${user.id}/orders`)
      .then(res => res.data)
      .then(cart => dispatch(gotCart(cart)))
      .catch(err => console.error(err))
  )
);

const reducer = (state = {}, action) => {
  switch (action.type) {
  case GOT_CART:
    return action.cart;
  default:
    return state;
  }
};

export default reducer;
