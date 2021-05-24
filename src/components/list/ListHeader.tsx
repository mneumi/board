import React from 'react';
import styled from 'styled-components';
import { Button, Dropdown, Menu } from 'antd';
import { FaPlus, FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import { SettingOutlined } from '@ant-design/icons';
import { GuideType } from '../../common/interface';
import { useDelListEffect, useSetListEffect } from './hooks';
import { useAddCardEffect } from '../card/hooks';

interface Props {
  type: GuideType;
  title: string;
  listId: number;
  canPrev: boolean;
  canNext: boolean;
  prevPage: () => void;
  nextPage: () => void;
}

export const ListHeader: React.FC<Props> = (props) => {
  const { title, type, listId, prevPage, nextPage, canPrev, canNext } = props;

  const { onSet, setLoading } = useSetListEffect({ listId, type, title });
  const { onDel, delLoading } = useDelListEffect({ listId, type });
  const { onAdd } = useAddCardEffect(type, listId);

  return (
    <Wrapper>
      <ListHeaderTitle>
        <ListHeaderTitleIcon />
        <div>{title}</div>
      </ListHeaderTitle>
      <ListHeaderController>
        <LeftButton canPrev={canPrev} onClick={prevPage} />
        <RightButton canNext={canNext} onClick={nextPage} />
        <PlusButton onClick={onAdd} />
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="create" onClick={onSet}>
                <Button loading={setLoading} type="text">
                  编辑列表
                </Button>
              </Menu.Item>
              <Menu.Item key="delete" onClick={onDel}>
                <Button loading={delLoading} type="text">
                  删除列表
                </Button>
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <SettingOutlined />
        </Dropdown>
      </ListHeaderController>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
`;

const ListHeaderTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const ListHeaderTitleIcon = styled.div`
  width: 0.3rem;
  height: 1rem;
  margin-right: 0.4rem;
  background-color: #1da57a;
`;

const ListHeaderController = styled.div`
  display: flex;
  align-items: center;
`;

const PlusButton = styled(FaPlus)`
  cursor: pointer;
  margin-right: 0.4rem;
  font-size: 0.8rem;
`;

const LeftButton = styled(FaCaretLeft)`
  cursor: pointer;
  margin-right: 0.2rem;
  font-size: 1rem;
  color: ${(props: { canPrev: boolean }) => (props.canPrev ? 'black' : '#999')};
`;

const RightButton = styled(FaCaretRight)`
  cursor: pointer;
  margin-right: 0.4rem;
  font-size: 1rem;
  color: ${(props: { canNext: boolean }) => (props.canNext ? 'black' : '#999')};
`;
