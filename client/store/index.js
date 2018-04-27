import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import categories from './categories';
import products from './products';
import user from './sessions';
import cart from './cart';

const reducers = combineReducers({ categories, products, user, cart });
const middleware = applyMiddleware(thunk, logger);

const store = createStore(reducers, middleware);

export default store;
export * from './categories';
export * from './products';
export * from './sessions';
export * from './cart';
