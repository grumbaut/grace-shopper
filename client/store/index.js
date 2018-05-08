import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import categories from './categories';
import products from './products';
import user from './sessions';
import cart from './cart';
import reviews from './reviews';
import orders from './orders';
import users from './users';

import { signUp } from './sessions';
import { addUser } from './users';

const reducers = combineReducers({ categories, products, user, cart, reviews, orders, users });
const middleware = applyMiddleware(thunk, logger);

const store = createStore(reducers, middleware);

export const signUpAddUser = (userInfo, history) => {
  return dispatch => {
    return dispatch(signUp(userInfo, history))
      .then(user => dispatch(addUser(user)))
      .then(() => history.push('/'));
  };
};

export default store;
export * from './categories';
export * from './products';
export * from './sessions';
export * from './reviews';
export * from './cart';
export * from './orders';
export * from './users';
