import React, { useEffect, useState } from 'react';
import { AuthForm, User } from './auth.interface';
import * as authService from './auth.service';

export const AuthContext =
  React.createContext<
    | {
        user: User | null;
        register: (form: AuthForm) => Promise<void>;
        login: (form: AuthForm) => Promise<void>;
        logout: () => Promise<void>;
        getToken: () => string | null;
      }
    | undefined
  >(undefined);

AuthContext.displayName = 'AuthContext';

interface Props {
  children: React.ReactNode;
}

// AuthProvider是一个封装过的 Provider 组件
export const AuthProvider: React.FC<Props> = (props) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (form: AuthForm) => authService.login(form).then(setUser);
  const register = (form: AuthForm) => authService.register(form);
  const logout = () => authService.logout().then(() => setUser(null));
  const getToken = () => authService.getToken();

  useEffect(() => {
    authService.bootstrapUser().then(setUser);
  }, []);

  const { children } = props;

  return (
    <AuthContext.Provider value={{ user, login, register, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};
