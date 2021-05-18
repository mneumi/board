import React, { useState } from 'react';
import styled from 'styled-components';
import { Dropdown, Button, Menu } from 'antd';
import { FaCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export const User: React.FC = () => {
  const [isLogin] = useState(false);
  const [t] = useTranslation();

  const userMenu = (
    <Menu>
      <Menu.Item
        key="username"
        disabled
        style={{ color: 'black', cursor: 'default' }}
      >
        mneumi
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="editProfile">修改资料</Menu.Item>
      <Menu.Item key="logout">退出登录</Menu.Item>
    </Menu>
  );

  return (
    <Wrapper>
      {isLogin ? (
        <Dropdown overlay={userMenu} placement="bottomCenter" arrow>
          <FaCircle size={30} />
        </Dropdown>
      ) : (
        <>
          <Button style={{ marginRight: '1rem' }} size="small">
            {t('home_page.header.login')}
          </Button>
          <Button size="small">
            {t('home_page.header.register')}
          </Button>
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
