import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const composeEnhancers = process.env.NODE_ENV !== 'production'
    && typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
