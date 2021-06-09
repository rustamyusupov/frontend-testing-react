// @ts-check

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/index.js';
import App from './components/App.jsx';
import { fetchTasks } from './actions/index.js';

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  const worker = require('../__mocks__/server.js').default;
  worker.start();
}

const store = createStore(
  reducers,
  applyMiddleware(thunk),
);

store.dispatch(fetchTasks());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container'),
);
