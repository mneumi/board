import React from 'react';
import styled from 'styled-components';
import { Button, Dropdown, Menu, Modal } from 'antd';
import { FaPlus } from 'react-icons/fa';
import { SettingOutlined } from '@ant-design/icons';
import { GuideType } from '../../common/interface';
import {
  createFormModal,
  CreateFormModalParams,
} from '../form_modal/createFormModal';
import { useCustomMutation } from '../../utils/request';

interface Props {
  type: GuideType;
  title: string;
  listId: number;
}

export const ListHeader: React.FC<Props> = (props) => {
  const { title, type, listId } = props;

  const { mutate: setList, loading: setLoading } = useCustomMutation<
    null,
    { title: string; listId: number }
  >({
    cacheTag: `${type}list`,
    url: `/${type}list/${listId}`,
    method: 'PUT',
    successMessage: '更新列表成功',
    errorMessage: '更新列表失败',
  });

  const { mutate: delList, loading: delLoading } = useCustomMutation({
    cacheTag: `${type}list`,
    url: `/${type}list`,
    pathParam: `/${listId}`,
    method: 'DELETE',
    successMessage: '删除列表成功',
    errorMessage: '删除列表失败',
  });

  const confirmCb = (values: { [key: string]: string }) => {
    const { title } = values;
    setList({
      data: {
        title,
        listId,
      },
    });
  };

  const createFormModalParam: CreateFormModalParams = {
    title: '编辑列表',
    confirmCb,
    confirmText: '更新',
    cancelText: '取消',
    formItems: [
      {
        key: 'title',
        name: 'title',
        label: '列表标题',
        rules: [{ required: true, message: '列表标题不能为空' }],
        initialValue: title,
        placeholder: '请输入标题',
        clear: false,
      },
    ],
  };

  const onDelete = (listId: number) => {
    Modal.confirm({
      content: '确定要删除吗？一旦删除无法恢复！',
      okText: '确认删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        delList({});
      },
    });
  };

  return (
    <Wrapper>
      <ListHeaderTitle>
        <ListHeaderTitleIcon />
        <div>{title}</div>
      </ListHeaderTitle>
      <ListHeaderController>
        <Plus />
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="create"
                onClick={() => createFormModal(createFormModalParam)}
              >
                <Button loading={setLoading} type="text">
                  编辑列表
                </Button>
              </Menu.Item>
              <Menu.Item key="delete" onClick={() => onDelete(listId)}>
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

const Plus = styled(FaPlus)`
  cursor: pointer;
  margin-right: 0.4rem;
  font-size: 0.8rem;
`;
