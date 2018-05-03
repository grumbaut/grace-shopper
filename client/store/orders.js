import axios from 'axios';

const GOT_ORDERS = 'GOT_ORDERS';
const CHECKED_OUT_ORDER = 'CHECKED_OUT_ORDER';

const gotOrders = orders => {
  const action = { type: GOT_ORDERS, orders };
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

const reducer = (state = [], action) => {
  switch (action.type) {
  case GOT_ORDERS:
    return action.orders;
  case CHECKED_OUT_ORDER:
    return state.map(order => order.id !== action.order.id ? order : action.order);
  default:
    return state;
  }
};

export default reducer;
