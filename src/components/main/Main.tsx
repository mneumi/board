import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from '../../store';
import { ToolBar } from './ToolBar';
import { Content } from './Content';
import { GuideType } from '../../common/interface';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { Spin } from 'antd';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJzaGlubmt1NzIxIiwibmlja25hbWUiOiJzaGlua3U3MjEiLCJhdmF0YXIiOiJodHRwczovL2RlbW8uY29tIiwiZGVzYyI6IlRoaXMgaXMgc2hpbm5rdTcyMSIsImlhdCI6MTYyMTM0NDQwMywiZXhwIjoxNjIxOTQ5MjAzfQ.5a49eRII1uoTAyk2n6e7JY2PHetkv4_VVSOUQtg8L5Y';

const useGetList = (type: GuideType, take = 4) => {
  const [page, setPage] = useState<number>(1);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(
    [`${type}list`, { take, page }],
    ({ queryKey }) => {
      const { take, page } = queryKey[1] as { take: number; page: number };
      return axios.get(`http://localhost:5000/${type}list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          take,
          page,
        },
      });
    }
  );

  useEffect(() => {
    queryClient.invalidateQueries(`${type}list`);
  }, [page, type, queryClient]);

  const list = data?.data.message.list;
  const total = data?.data.message.total ?? 0;
  const pageCount = Math.ceil(total / take);

  return {
    list,
    pageCount,
    total,
    isLoading,
    isError,
    page,
    take,
    setPage,
  };
};

export const Main: React.FC = () => {
  const currentGuide = useSelector((state) => state.guide.currentGuide);

  const { list, total, isLoading, isError, take, page, setPage } =
    useGetList(currentGuide);

  // 重置页数
  useEffect(() => {
    return () => {
      setPage(1);
    };
  }, [currentGuide, setPage]);

  const render = () => {
    if (isError) {
      return <div>渲染错误</div>;
    }

    if (isLoading) {
      return <Spin size="large" />;
    }

    return (
      <>
        <ToolBar
          total={total}
          page={page}
          pageSize={take}
          setPage={setPage}
          type={currentGuide}
        />
        <Content list={list} type={currentGuide} />
      </>
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
