import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    typeof window === 'object' && typeof window.devToolsExtention === 'undefined'
      ? window.devToolsExtension()
      : f => f,
  ),
);

export default store;
