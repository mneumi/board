import React from 'react';
import styled from 'styled-components';
import { List as AntdList, Spin } from 'antd';
import { ListHeader } from './ListHeader';
import { GuideType } from '../../common/interface';
import { useGetCardEffect } from '../card/hooks';
import { LinkCard, MusicCard } from '../card';

interface Props {
  type: GuideType;
  title: string;
  listId: number;
}

export const List: React.FC<Props> = (props) => {
  const { title, type, listId } = props;

  const { list, nextPage, prevPage, isLoading, setPage, canNext, canPrev } =
    useGetCardEffect(type, 999);

  console.log(list?.length);

  return (
    <Container className="wf">
      <Wrapper
        itemLayout="vertical"
        pagination={{
          pageSize: 4,
          hideOnSinglePage: true,
        }}
        header={
          <ListHeader
            listId={listId}
            type={type}
            title={title}
            canPrev={canPrev}
            canNext={canNext}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        }
        dataSource={list}
        renderItem={(ii) => {
          const item = ii as any;
          return (
            <LinkCard
              key={item.id}
              listId={listId}
              cardId={item.id}
              url={item.url}
              image={item.image}
              title={item.title}
              setPage={setPage}
            />
            // <MusicCard
            //     cardId={item.id}
            //     listId={listId}
            //     setPage={setPage}
            //     singer={item.singer}
            //     song={item.song}
            //     language={item.language}
            //     songUrl={item.songUrl}
            //     coverImg={item.coverImg}
            //   />
          );
        }}
      ></Wrapper>
    </Container>
  );
};

const Container = styled.div`
  background-color: red;
  margin-top: 0.5rem;
  height: calc(100% - 2rem);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled(AntdList)`
  background-color: #fff;
  margin: 0 2rem !important;
  /* padding: 1rem 0; */
  /* border-radius: 0.3rem; */
  /* height: calc(100% - 2rem); */
  /* background-color: blue; */
  padding: 0 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: red;
  height: 100%;
`;
