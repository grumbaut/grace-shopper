import axios from 'axios';

const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const CREATE_PRODUCT = 'CREATE_PRODUCT'

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
        return axios.post('/api/students', product)
            .then(result => result.data)
            .then(student => dispatch ({
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
  console.log('reduce?')
  switch (action.type) {
    case UPDATE_PRODUCT:
    state = state.map( product => product.id === action.product.id ? action.product : product )
    break;
    
    case CREATE_PRODUCT:
    state = [... state, action.product]
   
   default:
    return state;
  }
};

export default reducer;