import { Menu, Select } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { GuideType } from '../../common/interface';
import { ListDto } from '../list/hooks';
import { AddListButton } from './AddListButton';
import { AddCardButton } from './AddCardButton';
import { UserOutlined } from '@ant-design/icons';

interface Props {
  type: GuideType;
  list: ListDto[];
  setListId: (v: number) => void;
}

export const ToolBar: React.FC<Props> = (props) => {
  const { type, list, setListId } = props;

  return (
    <Wrapper>
      <LeftButtonGroup>
        <AddListButton type={type} />
        <Select defaultValue={list[0].id} onChange={setListId}>
          {list.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.title}
            </Select.Option>
          ))}
        </Select>
      </LeftButtonGroup>
      <AddCardButton />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 4.5rem;
  border-bottom: 1px solid #fff;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  background-color: red;
`;

const LeftButtonGroup = styled.div`
  flex: 1;
`;
