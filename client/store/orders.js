import axios from 'axios';
import headerFunc from './headerFunc';

const GOT_ORDERS = 'GOT_ORDERS';
const GOT_UPDATED_ORDER = 'GOT_UPDATED_ORDER';
const CHECKED_OUT_ORDER = 'CHECKED_OUT_ORDER';

const gotOrders = orders => {
  const action = { type: GOT_ORDERS, orders };
  return action;
};

const gotUpdatedOrder = order => {
  const action = { type: GOT_UPDATED_ORDER, order };
  return action;
};

export const checkoutOrder = order => {
  const action = { type: CHECKED_OUT_ORDER, order };
  return action;
};

export const getOrders = () => {
  return dispatch => {
    return axios.get('/api/orders')
      .then(res => res.data)
      .then(orders => dispatch(gotOrders(orders)))
      .catch(err => console.error(err));
  };
};

export const updateOrder = (userId, orderId, update, history) => {
  return dispatch => {
    const headers = headerFunc();
    return axios.put(`/api/users/${userId}/orders/${orderId}`, update, { headers })
      .then(res => res.data)
      .then(order => dispatch(gotUpdatedOrder(order)))
      .then(() => history.push('/manage-orders'))
      .catch(err => console.error(err));
  };
};

export const cancelOrder = (userId, orderId) => {
  return dispatch => {
    return axios.delete(`/api/users/${userId}/orders/${orderId}`)
      .then(res => res.data)
      .then(order => dispatch(gotUpdatedOrder(order)))
      .catch(err => console.error(err));
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
  case GOT_ORDERS:
    return action.orders;
  case GOT_UPDATED_ORDER:
    return state.map(order => order.id !== action.order.id ? order : action.order);
  case CHECKED_OUT_ORDER:
    return state.map(order => order.id !== action.order.id ? order : action.order);
  default:
    return state;
  }
};

export default reducer;
