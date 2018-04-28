import axios from 'axios';

const GOT_CART = 'GOT_CART';
const GOT_UPDATED_CART = 'GOT_UPDATED_CART';

const gotCart = cart => {
  const action = { type: GOT_CART, cart };
  return action;
};

const gotUpdatedCart = cart => {
  const action = { type: GOT_UPDATED_CART, cart };
  return action;
};

export const getCart = user => (
  dispatch => (
    axios.post(`/api/users/${user.id}/orders`)
      .then(res => res.data)
      .then(cart => {
        dispatch(gotCart(cart));
      })
      .catch(err => console.error(err))
  )
);

export const updateCart = (userId, orderId, lineItems) => (
  dispatch => (
    axios.put(`/api/users/${userId}/orders/${orderId}/quantity`, lineItems)
      .then(res => res.data)
      .then(cart => dispatch(gotUpdatedCart(cart)))
      .catch(err => console.error(err))
  )
);

const reducer = (state = {}, action) => {
  switch (action.type) {
  case GOT_CART:
    return action.cart;
  case GOT_UPDATED_CART:
    return action.cart;
  default:
    return state;
  }
};

export default reducer;
