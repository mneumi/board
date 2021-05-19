import { Button } from 'antd';
import React from 'react';
import { GuideType } from '../../common/interface';
import { useCustomMutation } from '../../utils/request';
import {
  createFormModal,
  CreateFormModalParams,
} from '../form_modal/createFormModal';

interface Props {
  type: GuideType;
}

export const AddListButton: React.FC<Props> = (props) => {
  const { type } = props;

  const { mutate: addList, loading } = useCustomMutation<
    null,
    {
      title: string;
    }
  >({
    url: `/${type}list`,
    method: 'POST',
    cacheTag: `${type}list`,
    successMessage: '创建列表成功',
    errorMessage: '创建列表失败',
  });

  const confirmCb = (values: { [key: string]: string }) => {
    const { title } = values;
    addList({ data: { title } });
  };

  const createFormModalParam: CreateFormModalParams = {
    title: '新建列表',
    confirmCb,
    confirmText: '新建列表',
    cancelText: '取消',
    formItems: [
      {
        key: 'title',
        name: 'title',
        label: '列表标题',
        rules: [{ required: true, message: '列表标题不能为空' }],
        placeholder: '请输入列表标题',
        clear: true,
      },
    ],
  };

  return (
    <React.Fragment>
      <Button
        style={{ marginRight: '1rem' }}
        loading={loading}
        onClick={() => createFormModal(createFormModalParam)}
      >
        新建列表
      </Button>
    </React.Fragment>
  );
};
