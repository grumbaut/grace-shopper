import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import categories from './categories';
import products from './products';
import product from './product'
import user from './sessions';
import users from './users'

const reducers = combineReducers({ categories, products, product, user, users });
const middleware = applyMiddleware(thunk, logger);

const store = createStore(reducers, middleware);

export default store;
export * from './categories';
export * from './products';
export * from './sessions';
export * from './product';
export * from './users'
