import { Button, Dropdown, Menu } from 'antd';
import React from 'react';
import { GuideType } from '../../common/interface';
import {
  LinkDto,
  MusicDto,
  TodoDto,
  useDelCardEffect,
  useSetCardEffect,
} from './hooks';
import { SettingOutlined } from '@ant-design/icons';

interface SettingIconProps {
  type: GuideType;
  cardId: number;
  listId: number;
  dto: TodoDto | LinkDto | MusicDto;
  setPage: (v: number) => void;
}

export const SettingIcon: React.FC<SettingIconProps> = (props) => {
  const { type, cardId, dto, listId, setPage } = props;

  const { onDel, delLoading } = useDelCardEffect({
    type,
    cardId,
    setPage,
  });

  const { onSet, setLoading } = useSetCardEffect({
    cardId,
    listId,
    type,
    dto,
  });

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="create" onClick={onSet}>
            <Button loading={setLoading} type="text">
              编辑卡片
            </Button>
          </Menu.Item>
          <Menu.Item key="delete" onClick={onDel}>
            <Button loading={delLoading} type="text">
              删除卡片
            </Button>
          </Menu.Item>
        </Menu>
      }
      trigger={['click']}
      placement={'bottomCenter'}
    >
      <SettingOutlined style={{ color: '#FFF' }} />
    </Dropdown>
  );
};
