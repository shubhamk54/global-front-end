import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'Store/configureStore';
import App from 'Containers/App/App.js';

import 'Assets/scss/index.scss';
import "bootstrap/dist/css/bootstrap.min.css";

const store = configureStore();

render((
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path="/" component={App} />
      </div>
    </BrowserRouter>
  </Provider>
), document.getElementById('app'));
