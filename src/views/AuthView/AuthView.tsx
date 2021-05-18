import React, { useState } from 'react';
import styled from 'styled-components';
import LogoImage from '../../assets/logo.svg';
import { Card as AntdCard } from 'antd';
import { useTranslation } from 'react-i18next';
import { Language as CommonLanguage } from '../../components';
import { LoginForm, RegisterForm } from '../../components';

type TabType = 'login' | 'register';

interface TabListType {
  key: TabType;
  tab: string;
}

interface ContentListType {
  [key: string]: React.ReactElement;
}

export const LoginView: React.FC = () => {
  const [t] = useTranslation();

  const tabList: TabListType[] = [
    {
      key: 'login',
      tab: t('auth_page.login'),
    },
    {
      key: 'register',
      tab: t('auth_page.register'),
    },
  ];

  const contentList: ContentListType = {
    login: <LoginForm />,
    register: <RegisterForm />,
  };

  const [key, setKey] = useState<TabType>('login');

  return (
    <Wrapper>
      <Img src={LogoImage} alt="" />
      <Card
        tabList={tabList}
        activeTabKey={key}
        onTabChange={(key) => {
          setKey(key as TabType);
        }}
      >
        {contentList[key]}
      </Card>
      <div style={{ position: 'fixed', top: '2rem', right: '2rem' }}>
        <Language />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #1da57a;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 10vh;
  align-items: center;
`;

const Card = styled(AntdCard)`
  width: 50vw;
  margin-top: 2rem !important;
`;

const Img = styled.img`
  height: 5rem;
`;

const Language = styled(CommonLanguage)`
  position: fixed !important;
  top: 0;
  right: 0;
  background-color: red;
`;
