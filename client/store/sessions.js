import axios from 'axios';

const SET_USER = 'SET_USER';

export const getUserFromToken = token => {
  return dispatch => {
    return axios.get(`/api/sessions/${token}`)
      .then( result => {
        dispatch({
          type: SET_USER,
          user: result.data
        });
      });
  };
};

export const logout = ()=> {
  return dispatch => {
    window.localStorage.removeItem('token');
    dispatch({
      type: SET_USER,
      user: {}
    });
  };
};

export const attemptLogin = (credentials)=> {
  return dispatch => {
    return axios.post('/api/sessions', credentials)
      .then (result => window.localStorage.setItem('token', result.data))
      .then(()=> dispatch(getUserFromToken(window.localStorage.getItem('token'))));
  };
};

const reducer = (state = {}, action) => {
  switch (action.type) {
  case SET_USER:
    return action.user;
  default:
    return state;
  }
};

export default reducer;
