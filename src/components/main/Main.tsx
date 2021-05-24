import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import { useSelector } from '../../store';
import { ToolBar } from '../tool_bar/ToolBar';
import { Content } from './Content';
import { useGetListEffect } from '../list/hooks';

export const Main: React.FC = () => {
  const currentGuide = useSelector((state) => state.guide.currentGuide);

  const { list, isLoading, isError } = useGetListEffect(currentGuide);
  const [listId, setListId] = useState<number>(0);

  useEffect(() => {
    setListId(0);
  }, [currentGuide]);

  const render = () => {
    if (isError) {
      return <div>网络错误</div>;
    }

    if (isLoading) {
      return <Spin size="large" />;
    }

    return (
      <React.Fragment>
        <ToolBar list={list} type={currentGuide} setListId={setListId} />
        <Content type={currentGuide} listId={listId} />
      </React.Fragment>
    );
  };

  return <Wrapper>{render()}</Wrapper>;
};

const Wrapper = styled.main`
  grid-area: main;
  background-color: #207f4c;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #fff;
`;
