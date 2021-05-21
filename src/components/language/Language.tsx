import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {
  useSelector,
  RootDispatch,
  languageType,
  languageSlice,
} from '../../store';
import { setStorageLng } from '../../i18n/config';

export const Language: React.FC = () => {
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );

  const dispatch = useDispatch<RootDispatch>();

  const changeLanguage = (code: languageType) => {
    dispatch(languageSlice.actions.changeLanguage(code));
    setStorageLng(code);
  };

  const languageMenu = (
    <Menu>
      <Menu.Item key="language_zh" onClick={() => changeLanguage('zh')}>
        中文
      </Menu.Item>
      <Menu.Item key="language_en" onClick={() => changeLanguage('en')}>
        English
      </Menu.Item>
    </Menu>
  );

  return (
    <Wrapper>
      <Dropdown overlay={languageMenu} placement="bottomCenter" arrow>
        <Button size="small">
          {currentLanguage === 'zh' ? '中文' : 'English'} <DownOutlined />
        </Button>
      </Dropdown>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 4rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
  margin-right: 2rem;
`;
