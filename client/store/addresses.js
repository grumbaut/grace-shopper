import axios from 'axios';
import headerFunc from './headerFunc';

const GOT_ADDRESSES = 'GOT_ADDRESSES';
const GOT_ADDRESS = 'GOT_ADDRESS';

const gotAddresses = addresses => {
  const action = { type: GOT_ADDRESSES, addresses };
  return action;
};

const gotAddress = address => {
  const action = { type: GOT_ADDRESS, address };
  return action;
};

export const getAddresses = id => {
  return dispatch => {
    const headers = headerFunc();
    return axios.get(`/api/users/${id}/addresses`, { headers })
      .then(result => result.data)
      .then(addresses => dispatch(gotAddresses(addresses)));
  };
};

export const postAddress = (id, addressInfo, addressId) => {
  if(!addressId) {
    return dispatch => {
      const headers = headerFunc();
      return axios.post(`/api/users/${id}/addresses`, addressInfo, { headers })
        .then(result => result.data)
        .then(address => dispatch(gotAddress(address)));
    };
  } else {
    return dispatch => {
      const headers = headerFunc();
      return axios.put(`/api/users/${id}/addresses/${addressId}`, addressInfo, { headers })
        .then(result => result.data)
        .then(address => dispatch(gotAddress(address)));
    };
  }
};

const reducer = (state = [], action) => {
  switch (action.type) {
  case GOT_ADDRESSES:
    return action.addresses;
  case GOT_ADDRESS:
    return [...state, action.address];
  default:
    return state;
  }
};

export default reducer;
