import { message } from 'antd';
import axios from 'axios';
import { setBearerToken } from '../../utils/request';
import { AuthForm, User } from './auth.interface';

const localStorageKey = '__token__';

export const getToken = () => {
  return window.localStorage.getItem(localStorageKey);
};

export const getProfile = async (token: string) => {
  const { data: user } = await axios.get<User>(`/user/profile`);

  return user;
};

export const login = async (data: AuthForm) => {
  try {
    const {
      data: { access_token: token },
    } = await axios.post<{ access_token: string }>(`/auth/login`, data);

    window.localStorage.setItem(localStorageKey, token);
    setBearerToken(token);

    const user = await getProfile(token);

    message.success('登录成功');

    return user;
  } catch (err) {
    const msg = err.message as string;

    if (msg.includes('401')) {
      message.error('用户名或密码错误');
    } else {
      message.error(msg);
    }

    return null;
  }
};

export const register = async (data: AuthForm) => {
  try {
    await axios.post(`/auth/register`, data);

    message.success('注册成功');
  } catch (err) {
    const msg = err.message as string;
    message.error(msg);
  }
};

export const logout = async () => {
  window.localStorage.removeItem(localStorageKey);
};

export const bootstrapUser = async () => {
  const token = getToken();

  let user: User | null = null;

  if (token) {
    setBearerToken(token);
    user = await getProfile(token);
  }

  return user;
};