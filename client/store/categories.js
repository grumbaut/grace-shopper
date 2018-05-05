import axios from 'axios';

const GOT_CATEGORIES = 'GOT_CATEGORIES';
const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
const CREATE_CATEGORY = 'CREATE_CATEGORY';
const DELETE_CATEGORY = 'DELETE_CATEGORY';

const addCategoriesToStore = categories => {
  const action = { type: GOT_CATEGORIES, categories };
  return action;
};

const createCategoryInStore = category => {
  const action = { type: CREATE_CATEGORY, category };
  return action;
};

const deleteCategoryInStore = category => {
  const action = { type: DELETE_CATEGORY, category };
  return action;
};

const updateCategoryInStore = category => {
  const action = { type: UPDATE_CATEGORY, category };
  return action;
};

const reducer = (state = [], action) => {
  switch (action.type) {
  case GOT_CATEGORIES:
    return action.categories;
  case CREATE_CATEGORY:
    return [... state, action.category];
  case DELETE_CATEGORY:
    return state.filter(category => category.id !== action.category.id);
  case UPDATE_CATEGORY:
    return state.map( category => category.id === action.category.id ? action.category : category);
  default:
    return state;
  }
};

export const getCategories = () => (
  dispatch => (
    axios.get('/api/categories')
      .then(res => res.data)
      .then(categories => dispatch(addCategoriesToStore(categories)))
  )
);

export const deleteCategory = (category, history) => (
  dispatch => (
    axios.delete(`api/categories/${category.id}`)
      .then( () => dispatch(deleteCategoryInStore(category)))
      .then( () => history.push('/categories'))
  )
);

export const saveCategory = (category) => (
  category.id ? (
    dispatch => (
      axios.put(`/api/categories/${category.id}`, category)
        .then(result => result.data)
        .then(category => dispatch(updateCategoryInStore(category))))
      ) : (
      dispatch => (
        axios.post(`api/categories`, category)
          .then(res => res.data)
          .then(category => dispatch(createCategoryInStore(category)))
      )
    )
  );

export default reducer;
