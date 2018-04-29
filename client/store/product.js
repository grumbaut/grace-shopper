import axios from 'axios';

const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const updateProduct = (product)=> {
    if(product.id){
        return(dispatch)=> {
            return axios.put(`/api/products/${product.id}`, product)
                .then(result => result.data)
                .then(product => dispatch({
                    type: UPDATE_PRODUCT,
                    product
                })
            )
        }
    }
}

const reducer = (state = [], action) => {
  switch (action.type) {
  case UPDATE_PRODUCT:
    return action.product;
  default:
    return state;
  }
};

export default reducer;