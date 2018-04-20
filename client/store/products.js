import axios from 'axios';

const GOT_PRODUCTS = 'GOT_PRODUCTS';

const addProductsToStore = products => {
  const action = { type: GOT_PRODUCTS, products };
  return action;
};

const reducer = (state = [], action) => {
  switch (action.type) {
  case GOT_PRODUCTS:
    return action.products;
  default:
    return state;
  }
};

export default reducer;
