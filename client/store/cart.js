import axios from 'axios';

const GOT_CART = 'GOT_CART';
const GOT_UPDATED_CART = 'GOT_UPDATED_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
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

export const updateQuantity = lineItems => {
  const action = { type: UPDATE_QUANTITY, lineItems };
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

const reducer = (state = {}, action) => {
  switch (action.type) {
  case GOT_CART:
    return action.cart;
  case GOT_UPDATED_CART:
    return action.cart;
  case UPDATE_QUANTITY:
    return Object.assign({}, state, action.lineItems);
  case DELETED_ITEM:
    return Object.assign({}, state, { lineitems: state.lineitems.filter(item => item.id !== Number(action.id)) });
  default:
    return state;
  }
};

export default reducer;
