import axios from 'axios';

const GOT_CART = 'GOT_CART';

const gotCart = cart => {
  const action = { type: GOT_CART, };
  return action;
};

// export const fetchCart = () => (
//   dispatch => (
//     axios.get('/api/')
//   )
// );
