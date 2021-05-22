import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export const RegisterForm: React.FC = () => {
  const [t] = useTranslation();

  const onFinish = (values: unknown) => {
    console.log('Received values of form: ', values);
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
      <Form.Item
        name="confirm"
        dependencies={['password']}
        rules={[
          { required: true, message: t('auth_page.confirm') },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(t('auth_page.confirm_error')));
            },
          }),
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder={t('auth_page.confirm')}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {t('auth_page.register')}
        </Button>
      </Form.Item>
    </Form>
  );
};
