import React from 'react';
import { useAuth } from './components/auth/hooks';
import { AuthView, HomeView } from './views';

const App: React.FC = () => {
  const { user } = useAuth();
  return user ? <HomeView /> : <AuthView />;
};

export default App;
