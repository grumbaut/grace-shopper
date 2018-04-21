import axios from 'axios';

const GOT_CATEGORIES = 'GOT_CATEGORIES';

const addCategoriesToStore = categories => {
  const action = { type: GOT_CATEGORIES, categories };
  return action;
};

export const getCategories = () => (
  dispatch => (
    axios.get('/api/categories')
      .then(res => res.data)
      .then(categories => dispatch(addCategoriesToStore(categories)))
  )
);

const reducer = (state = [], action) => {
  switch (action.type) {
  case GOT_CATEGORIES:
    return action.categories;
  default:
    return state;
  }
};

export default reducer;
