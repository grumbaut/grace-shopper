import axios from 'axios';
import headerFunc from './headerFunc';

const GOT_ADDRESSES = 'GOT_ADDRESSES';
const GOT_ADDRESS = 'GOT_ADDRESS';
const GOT_UPDATED_ADDRESS = 'GOT_UPDATED_ADDRESS';
const DELETED_ADDRESS = 'DELETED_ADDRESS';

const gotAddresses = addresses => {
  const action = { type: GOT_ADDRESSES, addresses };
  return action;
};

const gotAddress = address => {
  const action = { type: GOT_ADDRESS, address };
  return action;
};

const gotUpdatedAddress = address => {
  const action = { type: GOT_UPDATED_ADDRESS, address };
  return action;
};

const deletedAddress = id => {
  const action = { type: DELETED_ADDRESS, id };
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

export const postAddress = (id, addressInfo) => {
  return dispatch => {
    const headers = headerFunc();
    return axios.post(`/api/users/${id}/addresses`, addressInfo, { headers })
      .then(result => result.data)
      .then(address => dispatch(gotAddress(address)));
  };
};

export const putAddress = (id, addressInfo, addressId, history) => {
  return dispatch => {
    const headers = headerFunc();
    return axios.put(`/api/users/${id}/addresses/${addressId}`, addressInfo, { headers })
      .then(result => result.data)
      .then(address => dispatch(gotUpdatedAddress(address)))
      .then(() => history.push('/addresses'));
  };
};

export const deleteAddress = (id, addressId) => {
  return dispatch => {
    const headers = headerFunc();
    return axios.delete(`/api/users/${id}/addresses/${addressId}`, { headers })
      .then(() => dispatch(deletedAddress(addressId)));
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
  case GOT_ADDRESSES:
    return action.addresses;
  case GOT_ADDRESS:
    return [...state, action.address];
  case GOT_UPDATED_ADDRESS:
    return state.map(address => address.id === action.address.id ? action.address : address);
  case DELETED_ADDRESS:
    return state.filter(address => address.id !== action.id);
  default:
    return state;
  }
};

export default reducer;
