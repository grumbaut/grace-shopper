import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import categories from './categories';
import products from './products';
import user from './sessions';

const reducers = combineReducers({ categories, products, user });
const middleware = applyMiddleware(thunk, logger);

const store = createStore(reducers, middleware);

export default store;
export * from './categories';
export * from './products';
export * from './sessions';
