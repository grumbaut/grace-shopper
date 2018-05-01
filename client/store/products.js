import axios from 'axios';

const GOT_PRODUCTS = 'GOT_PRODUCTS';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const CREATE_PRODUCT = 'CREATE_PRODUCT';

const addProductsToStore = products => {
  const action = { type: GOT_PRODUCTS, products };
  return action;
};

export const getProducts = () => (
  dispatch => (
    axios.get('/api/products')
      .then(res => res.data)
      .then(products => dispatch(addProductsToStore(products)))
  )
);

export const updateProduct = (product, history)=> {
  console.log('store', product)
  if(product.id){
      return(dispatch)=> {
          return axios.put(`/api/products/${product.id}`, product)
              .then(result => result.data)
              .then(product => dispatch({
                  type: UPDATE_PRODUCT,
                  product
              }))
              .then(() => history.push('/'));
      }
  }
  return(dispatch) => {
      return axios.post('/api/products', product)
          .then(result => result.data)
          .then(product => dispatch ({
              type: CREATE_PRODUCT,  
              product
              })
          )
          .then (() => {
              history.push('/products')
      })
  }

}

const reducer = (state = [], action) => {
  switch (action.type) {
  case GOT_PRODUCTS:
    return action.products;
    break;
  case UPDATE_PRODUCT:
    state = state.map( product => product.id === action.product.id ? action.product : product )
    break;
  case CREATE_PRODUCT:
    state = [... state, action.product]
    break;
  default:
    return state;
  }
};

export default reducer;
