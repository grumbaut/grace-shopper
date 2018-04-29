import axios from 'axios';

const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

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
}

const reducer = (state = [], action) => {
  console.log('reduce?')
  switch (action.type) {
    case UPDATE_PRODUCT:
    state = state.map( product => product.id === action.product.id ? action.product : product )
  default:
    return state;
  }
};

export default reducer;