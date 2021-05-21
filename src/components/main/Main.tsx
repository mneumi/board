import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import { useSelector } from '../../store';
import { ToolBar } from '../tool_bar/ToolBar';
import { Content } from './Content';
import { useGetListEffect } from '../list/hooks';

export const Main: React.FC = () => {
  const currentGuide = useSelector((state) => state.guide.currentGuide);

  const { list, total, isLoading, isError, take, page, setPage } =
    useGetListEffect(currentGuide);

  useEffect(() => {
    return () => setPage(1); // 重置页数
  }, [currentGuide, setPage]);

  const render = () => {
    if (isError) {
      return <div>网络错误</div>;
    }

    if (isLoading) {
      return <Spin size="large" />;
    }

    return (
      <React.Fragment>
        <ToolBar
          total={total}
          page={page}
          pageSize={take}
          setPage={setPage}
          type={currentGuide}
        />
        <Content list={list} type={currentGuide} />
      </React.Fragment>
    );
  };

  return <Wrapper>{render()}</Wrapper>;
};

const Wrapper = styled.main`
  grid-area: main;
  background-color: #207f4c;
  display: flex;
  flex-direction: column;
  color: #fff;
`;
