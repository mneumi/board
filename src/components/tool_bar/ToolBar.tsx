import React from 'react';
import styled from 'styled-components';
import { GuideType } from '../../common/interface';
import { AddListButton } from './AddListButton';
import { Pagination } from './Pagination';

interface Props {
  type: GuideType;
  total: number;
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
}

export const ToolBar: React.FC<Props> = (props) => {
  const { type, ...rest } = props;

  return (
    <Wrapper>
      <AddListButton type={type} />
      <Pagination {...rest} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 4.5rem;
  border-bottom: 1px solid #fff;
  display: flex;
  align-items: center;
  padding-left: 2rem;
`;
