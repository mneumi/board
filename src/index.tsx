import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'normalize.css';
import 'antd/dist/antd.less';

import { store } from './store';
import { Provider } from 'react-redux';
import "./i18n/config";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
