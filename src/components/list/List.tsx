import React from 'react';
import styled from 'styled-components';
import { List as AntdList } from 'antd';
import { ListHeader } from './ListHeader';
import { GuideType } from '../../common/interface';

interface Props {
  type: GuideType;
  title: string;
  listId: number;
}

export const List: React.FC<Props> = (props) => {
  const { title, type, listId } = props;

  return (
    <Wrapper
      bordered
      itemLayout="vertical"
      header={<ListHeader listId={listId} type={type} title={title} />}
    />
  );
};

const Wrapper = styled(AntdList)`
  background-color: #fff;
  margin: 1rem !important;
  border-radius: 0.3rem;
  height: calc(100% - 2rem);
`;
