import React from 'react';
import styled from 'styled-components';
import { Button, Dropdown, Menu } from 'antd';
import { FaPlus } from 'react-icons/fa';
import { SettingOutlined } from '@ant-design/icons';
import { GuideType } from '../../common/interface';
import { useDelListEffect, useSetListEffect } from './hooks';

interface Props {
  type: GuideType;
  title: string;
  listId: number;
}

export const ListHeader: React.FC<Props> = (props) => {
  const { title, type, listId } = props;

  const { onSet, setLoading } = useSetListEffect({ listId, type, title });
  const { onDel, delLoading } = useDelListEffect({ listId, type });
  // const { onAdd } = useAddCardEffect(type, listId);
  const onAdd = () => {};

  return (
    <Wrapper>
      <ListHeaderTitle>
        <ListHeaderTitleIcon />
        <div>{title}</div>
      </ListHeaderTitle>
      <ListHeaderController>
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
