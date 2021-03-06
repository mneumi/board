import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from './hooks';

export const LoginForm: React.FC = () => {
  const [t] = useTranslation();
  const { login } = useAuth();

  const onFinish = (payload: { username: string; password: string }) => {
    login(payload);
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: t('auth_page.username') }]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder={t('auth_page.username')}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: t('auth_page.password') }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder={t('auth_page.password')}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {t('auth_page.login')}
        </Button>
      </Form.Item>
    </Form>
  );
};
