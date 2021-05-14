import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Modal } from 'antd';

export const Nav: React.FC = () => {
  const [t] = useTranslation();

  function showModal() {
    Modal.info({
      title: 'This is a notification message',
      content: (
        <div>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
        </div>
      )
    });
  }

  return (
    <Wrapper>
      <div onClick={showModal}>{t('home_page.header.project_intro')}</div>
      <a
        href="https://github.com/mneumi/board"
        target="_blank"
        rel="noreferrer"
      >
        {t('home_page.header.source_code')}
      </a>
      <a href="https://mneumi.cn" target="_blank" rel="noreferrer">
        {t('home_page.header.author_blog')}
      </a>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  > * {
    color: #fff;
    margin-left: 2rem;
    cursor: pointer;
    :hover {
      color: #fff;
    }
  }
`;
