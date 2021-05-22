import React from 'react';
import styled from 'styled-components';
import { Dropdown, Button, Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../auth/hooks';
import { Modal } from 'antd';

export const User: React.FC = () => {
  const { user, logout } = useAuth();
  const [t] = useTranslation();

  const handleEditProfile = () => {
    Modal.confirm({
      title: '编辑资料',
      content: <h2>Hello World</h2>,
      onOk: () => {
        alert('ok');
      },
      onCancel: () => {
        alert('cancel');
      },
    });
  };

  const userMenu = (
    <Menu>
      <Menu.Item
        key="username"
        disabled
        style={{ color: 'black', cursor: 'default' }}
      >
        {user?.nickname}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="editProfile" onClick={handleEditProfile}>
        {t('home_page.header.edit_profile')}
      </Menu.Item>
      <Menu.Item key="logout" onClick={logout}>
        {t('home_page.header.logout')}
      </Menu.Item>
    </Menu>
  );

  return (
    <Wrapper>
      {user ? (
        <Dropdown overlay={userMenu} placement="bottomCenter" arrow>
          <Avatar
            src="http://columns-oss.oss-cn-shenzhen.aliyuncs.com/1619371424893-4156lluh.jpeg"
            alt=""
          />
        </Dropdown>
      ) : (
        <>
          <Button style={{ marginRight: '1rem' }} size="small">
            {t('home_page.header.login')}
          </Button>
          <Button size="small">{t('home_page.header.register')}</Button>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Avatar = styled.img`
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  cursor: pointer;
`;
