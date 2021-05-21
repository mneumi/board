import React from 'react';
import { AuthContext } from './auth.context';

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth必须在AuthContext中使用');
  }
  return context;
};
