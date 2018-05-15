import axios from 'axios';
import { getOrders, checkoutOrder } from './orders';
import headerFunc from './headerFunc';

const GOT_CART = 'GOT_CART';
const GOT_UPDATED_CART = 'GOT_UPDATED_CART';
const DELETED_ITEM = 'DELETED_ITEM';

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

export const getCart = userId => (
  dispatch => {
    return axios.post(`/api/users/${userId}/orders`)
      .then(res => res.data)
      .then(cart => dispatch(gotCart(cart)))
      .then(() => dispatch(getOrders()))
      .catch(err => console.error(err));
  }
);

export const updateCart = (userId, orderId, lineItems) => (
  dispatch => {
    const headers = headerFunc();
    return axios.put(`/api/users/${userId}/orders/${orderId}/quantity`, lineItems, { headers })
      .then(res => res.data)
      .then(cart => dispatch(gotUpdatedCart(cart)))
      .catch(err => console.error(err));
  }
);

export const addToCart = (userId, orderId, quantity, product) => (
  dispatch => {
    const headers = headerFunc();
    return axios.put(`/api/users/${userId}/orders/${orderId}/add`, { quantity, product }, { headers })
      .then(res => res.data)
      .then(cart => dispatch(gotUpdatedCart(cart)))
      .catch(err => console.error(err));
  }
);

export const deleteItem = (userId, orderId, lineItemId) => (
  dispatch => {
    const headers = headerFunc();
    return axios.delete(`/api/users/${userId}/orders/${orderId}/lineitems/${lineItemId}`, { headers })
      .then(() => dispatch(deletedItem(lineItemId)))
      .catch( err => console.error(err));
  }
);

export const checkout = (userId, orderId, orderInfo, history) => (
  dispatch => {
    const headers = headerFunc();
    return axios.put(`/api/users/${userId}/orders/${orderId}/checkout`, orderInfo, { headers })
      .then(res => res.data)
      .then(order => dispatch(checkoutOrder(order)))
      .then(() => dispatch(getCart(userId)))
      .then(() => history.push(`/confirmation/${orderId}`));
  }
);

const reducer = (state = {}, action) => {
  switch (action.type) {
  case GOT_CART:
    return action.cart;
  case GOT_UPDATED_CART:
    return action.cart;
  case DELETED_ITEM:
    return Object.assign({}, state, { lineitems: state.lineitems.filter(item => item.id !== Number(action.id)) });
  default:
    return state;
  }
};

export default reducer;
