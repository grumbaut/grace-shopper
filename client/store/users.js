import axios from 'axios';

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

const reducer = (state = [], action) => {
  switch (action.type) {
  case GOT_USERS:
    return action.users;
  default:
    return state;
  }
};

export default reducer;