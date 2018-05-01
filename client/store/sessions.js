import axios from 'axios';
import { getCart } from './cart';

const SET_USER = 'SET_USER';
const GOT_USERS = 'GOT_USERS';

const addUsersToStore = users => {
  const action = { type: GOT_USERS, users };
  return action;
};

export const getUsers = () => (
  dispatch => (
    axios.get('/api/users')
      .then(res => res.data)
      .then(categories => dispatch(addUsersToStore(users)))
  )
);

const setUser = user => {
  const action = { type: SET_USER, user};
  return action;
};

export const signUp = (userInfo, history) => {
  return dispatch => {
    return axios.post('/api/sessions/signup', userInfo)
      .then(result => {
        window.localStorage.setItem('token', result.data);
      })
      .then(() => dispatch(getUserFromToken(window.localStorage.getItem('token'))))
      .then(() => history.push('/'));
  };
};

export const getUserFromToken = token => {
  return dispatch => {
    return axios.get(`/api/sessions/${token}`)
      .then( result => {
        dispatch(setUser(result.data));
        dispatch(getCart(result.data));
      })
      .catch(err => console.error(err));
  };
};

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('token');
    dispatch({
      type: SET_USER,
      user: {}
    });
  };
};

export const attemptLogin = (credentials, history) => {
  return dispatch => {
    return axios.post('/api/sessions', credentials)
      .then (result => window.localStorage.setItem('token', result.data))
      .then(()=> dispatch(getUserFromToken(window.localStorage.getItem('token'))))
      .then(() => history.push('/'));
  };
};

const reducer = (state = {}, action) => {
  switch (action.type) {
  case SET_USER:
    return action.user;
    break;
  case GOT_USERS:
    return action.users;
    break;
  default:
    return state;
  }
};

export default reducer;
