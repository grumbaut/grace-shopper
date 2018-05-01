import axios from 'axios';

const GOT_CART = 'GOT_CART';
const GOT_UPDATED_CART = 'GOT_UPDATED_CART';
const DELETED_ITEM = 'DELETED_ITEM';
const CHECKOUT_CART = 'CHECKOUT_CART';

const gotCart = cart => {
  const action = { type: GOT_CART, cart };
  return action;
};

const gotUpdatedCart = cart => {
  const action = { type: GOT_UPDATED_CART, cart };
  return action;
};

const deletedItem = id => {
  const action = { type: DELETED_ITEM, id };
  return action;
};

const checkoutCart = () => {
  const action = { type: CHECKOUT_CART };
  return action;
};

export const getCart = userId => (
  dispatch => (
    axios.post(`/api/users/${userId}/orders`)
      .then(res => res.data)
      .then(cart => dispatch(gotCart(cart)))
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

export const addToCart = (userId, orderId, quantity, product, history) => (
  dispatch => (
    axios.put(`/api/users/${userId}/orders/${orderId}/add`, { quantity, product })
      .then(res => res.data)
      .then(cart => dispatch(gotUpdatedCart(cart)))
      .then(() => history.push('/cart'))
      .catch(err => console.error(err))
  )
);

export const deleteItem = id => (
  dispatch => (
    axios.delete(`/api/lineitems/${id}`)
      .then(() => dispatch(deletedItem(id)))
      .catch( err => console.error(err))
  )
);

export const checkout = (userId, orderId, shippingInfo, history) => (
  dispatch => (
    axios.put(`/api/users/${userId}/orders/${orderId}/checkout`, shippingInfo)
      .then(() => dispatch(checkoutCart()))
      .then(() => dispatch(getCart(userId)))
  )
);

const reducer = (state = {}, action) => {
  switch (action.type) {
  case GOT_CART:
    return action.cart;
  case GOT_UPDATED_CART:
    return action.cart;
  case DELETED_ITEM:
    return Object.assign({}, state, { lineitems: state.lineitems.filter(item => item.id !== Number(action.id)) });
  case CHECKOUT_CART:
    return {};
  default:
    return state;
  }
};

export default reducer;
