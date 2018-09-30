import { createStore, compose, applyMiddleWare } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const store = createStore(
  reducers,
  compose(
    applyMiddleWare(thunk),
    typeof window === 'object' && typeof window.devToolsExtention === 'undefined'
      ? window.devToolsExtention()
      : f => f,
  ),
);

export default store;
