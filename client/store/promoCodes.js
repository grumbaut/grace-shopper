import axios from 'axios';
import headerFunc from './headerFunc';

const GOT_PROMOCODE = 'GOT_PROMOCODE';
const UPDATE_PROMOCODE = 'UPDATE_PROMOCODE';
const CREATE_PROMOCODE = 'CREATE_PROMOCODE';
const DELETE_PROMOCODE = 'DELETE_PROMOCODE';

const addPromoCodesToStore = promoCodes => {
  const action = { type: GOT_PROMOCODE, promoCodes };
  return action;
};

const createPromoCodesInStore = promoCode => {
  const action = { type: CREATE_PROMOCODE, promoCode };
  return action;
};

const deletePromoCodesInStore = promoCode => {
  const action = { type: DELETE_PROMOCODE, promoCode };
  return action;
};

const updatePromoCodesInStore = promoCode => {
  const action = { type: UPDATE_PROMOCODE, promoCode };
  return action;
};

const reducer = (state = [], action) => {
  switch (action.type) {
  case GOT_PROMOCODE:
    return action.promoCodes;
  case CREATE_PROMOCODE:
    return [... state, action.promoCode];
  case DELETE_PROMOCODE:
    return state.filter(promoCode => promoCode.id !== action.promoCode.id);
  case UPDATE_PROMOCODE:
    return state.map( promoCode => promoCode.id === action.promoCode.id ? action.promoCode : promoCode);
  default:
    return state;
  }
};

export const getPromoCodes = () => (
  dispatch => {
    return axios.get('/api/promocodes')
      .then(res => res.data)
      .then(promocodes => dispatch(addPromoCodesToStore(promocodes)));
  }
);

export const deletePromoCode = (promoCode, history) => (
  dispatch => {
    const headers = headerFunc();
    return axios.delete(`api/promocodes/${promocode.id}`, { headers })
      .then( () => dispatch(deletePromoCodesInStore(promocode)))
      .then( () => history.push('/promocodes'));
  }
);

export const savePromoCode = (promoCode, history) => {
  const headers = headerFunc();
  return promoCode.id ? (
    dispatch => {
      return axios.put(`api/promocodes/${promoCode.id}`, promoCode, { headers })
        .then(result => result.data)
        .then(promoCode => dispatch(updatePromoCodesInStore(promoCode)));
    }
  ) : (
    dispatch => {
      return axios.post(`api/promocodes`, promoCode, { headers })
        .then(result => result.data)
        .then(promoCode => dispatch(createPromoCodesInStore(promoCode)))
        .then( () => history.push('/promocodes'))
        .catch(err => console.error(err.response));
    }
  )
};

export default reducer;