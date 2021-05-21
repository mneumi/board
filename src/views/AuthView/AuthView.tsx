import React, { useState } from 'react';
import styled from 'styled-components';
import LogoImage from '../../assets/logo.svg';
import { Card as AntdCard } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  Language as CommonLanguage,
  LoginForm,
  RegisterForm,
} from '../../components';

type TabType = 'login' | 'register';

interface TabListType {
  key: TabType;
  tab: string;
}

interface ContentListType {
  [key: string]: React.ReactElement;
}

const useTabList = () => {
  const [t] = useTranslation();

  const [currentTab, setCurrentTab] = useState<TabType>('login');

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

  return { currentTab, setCurrentTab, tabList, contentList };
};

export const AuthView: React.FC = () => {
  const { currentTab, setCurrentTab, tabList, contentList } = useTabList();

  return (
    <Wrapper>
      <Img src={LogoImage} alt="" />
      <Card
        tabList={tabList}
        activeTabKey={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab as TabType);
        }}
      >
        {contentList[currentTab]}
      </Card>
      <LanguageWrapper>
        <CommonLanguage />
      </LanguageWrapper>
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

const LanguageWrapper = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
`;
