import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'normalize.css';
import 'antd/dist/antd.less';

import { store } from './store';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';
import './i18n/config';

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </QueryClientProvider>,
  document.getElementById('root')
);
