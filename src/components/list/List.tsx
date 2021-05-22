import React from 'react';
import styled from 'styled-components';
import { List as AntdList } from 'antd';
import { ListHeader } from './ListHeader';
import { GuideType } from '../../common/interface';
import { useGetCardEffect } from '../card/hooks';
import { LinkCard } from '../card';

interface Props {
  type: GuideType;
  title: string;
  listId: number;
}

export const List: React.FC<Props> = (props) => {
  const { title, type, listId } = props;

  const { list } = useGetCardEffect(type, 4);

  return (
    <Wrapper
      itemLayout="vertical"
      header={<ListHeader listId={listId} type={type} title={title} />}
    >
      <Content>
        {(list as any[]).map((item) => {
          return <LinkCard url={item.url} image={item.image} title={item.title} />;
        })}
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled(AntdList)`
  background-color: #fff;
  margin: 1rem !important;
  border-radius: 0.3rem;
  height: calc(100% - 2rem);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #999;
`;
