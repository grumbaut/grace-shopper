import axios from 'axios';

const GOT_USERS = 'GOT_USERS';
const GOT_USER = 'GOT_USER';

const addUsersToStore = users => {
  const action = { type: GOT_USERS, users };
  return action;
};

export const addUser = user => {
  const action = { type: GOT_USER, user };
  return action;
};

export const getUsers = () => (
  dispatch => (
    axios.get('/api/users')
      .then(res => res.data)
      .then(users => dispatch(addUsersToStore(users)))
  )
);

const reducer = (state = [], action) => {
  switch (action.type) {
  case GOT_USERS:
    return action.users;
  case GOT_USER:
    return [...state, action.user];
  default:
    return state;
  }
};

export default reducer;
