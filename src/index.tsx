import ReactDOM from 'react-dom';
import { store } from './store';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { ErrorBoundary } from './components/error_boundary';
import { AuthProvider } from './components/auth/auth.context';
import App from './App';

import './i18n/config';
import 'normalize.css';
import 'antd/dist/antd.less';

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <ReduxProvider store={store}>
      <AuthProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </AuthProvider>
    </ReduxProvider>
  </QueryClientProvider>,
  document.getElementById('root')
);
