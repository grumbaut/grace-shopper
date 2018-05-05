import axios from 'axios';

const GOT_USERS = 'GOT_USERS';
const UPDATE_USER = 'UDPATE_USER';
const CREATE_USER = 'CREATE_USER';
const DELETE_USER = 'DELETE_USER';

const addUsersToStore = users => {
  const action = { type: GOT_USERS, users };
  return action;
};

const createUserInStore = user => {
  const action = { type: CREATE_USER, user };
  return action;
};

const deleteUserInStore = user => {
  const action = { type: DELETE_USER, user };
  return action;
};


const updateUserInStore = user => {
    const action = { type: UPDATE_USER, user };
    return action;
};

export const getUsers = () => (
    dispatch => (
      axios.get('/api/users')
        .then(res => res.data)
        .then(users => dispatch(addUsersToStore(users)))
    )
);

export const saveUser = (user) => (
    console.log(user, 'saveUser'),
    user.id ? (
      dispatch => (
        axios.put(`api/users/${user.id}`, user)
          .then(result => result.data)
          .then(user => dispatch(updateUserInStore(user))))
    ) : (
      dispatch => (
        axios.post(`api/users`, user)
          .then(result => result.data)
          .then(user => dispatch(createUserInStore(user)))
      )
    )
);

const reducer = (state = [], action) => {
    switch (action.type) {
    case GOT_USERS:
      return action.users;
    case CREATE_USER:
      return [... state, action.user];
    case DELETE_USER:
      return state.filter(user => user.id !== action.user.id);
    case UPDATE_USER:
      return state.map( user => user.id === action.user.id ? action.user : user);
    default:
      return state;
    }
  };

export default reducer