import axios from 'axios';
import headerFunc from './headerFunc';

const GOT_PRODUCTS = 'GOT_PRODUCTS';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

const addProductsToStore = products => {
  const action = { type: GOT_PRODUCTS, products };
  return action;
};

const createProductInStore = product => {
  const action = { type: CREATE_PRODUCT, product };
  return action;
};

const deleteProductInStore = product => {
  const action = { type: DELETE_PRODUCT, product };
  return action;
};

const updateProductInStore = product => {
  const action = { type: UPDATE_PRODUCT, product };
  return action;
};

const reducer = (state = [], action) => {
  switch (action.type) {
  case GOT_PRODUCTS:
    return action.products;
  case CREATE_PRODUCT:
    return [... state, action.product];
  case DELETE_PRODUCT:
    return state.filter(product => product.id !== action.product.id);
  case UPDATE_PRODUCT:
    return state.map( product => product.id === action.product.id ? action.product : product);
  default:
    return state;
  }
};

export const getProducts = () => (
  dispatch => {
    return axios.get('/api/products')
      .then(res => res.data)
      .then(products => dispatch(addProductsToStore(products)));
  }
);

export const deleteProduct = (product, history) => (
  dispatch => {
    const headers = headerFunc();
    return axios.delete(`api/products/${product.id}`, { headers })
      .then( () => dispatch(deleteProductInStore(product)))
      .then( () => history.push('/products'));
  }
);

export const saveProduct = (product) => {
  const headers = headerFunc();
  return product.id ? (
    dispatch => {
      return axios.put(`api/products/${product.id}`, product, { headers })
        .then(result => result.data)
        .then(product => dispatch(updateProductInStore(product)));
    }
  ) : (
    dispatch => {
      return axios.post(`api/products`, product, { headers })
        .then(result => result.data)
        .then(product => dispatch(createProductInStore(product)))
        .catch(err => console.error(err.response));
    }
  );
};

export default reducer;
