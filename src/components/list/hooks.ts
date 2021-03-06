import axios from 'axios';
import { Modal } from 'antd';
import { useQuery } from 'react-query';
import { GuideType } from '../../common/interface';
import { useCustomMutation } from '../../utils/request';
import {
  createFormModal,
  CreateFormModalParams,
} from '../form_modal/createFormModal';

interface SetListParams {
  type: GuideType;
  listId: number;
  title: string;
}

interface DelListParams {
  type: GuideType;
  listId: number;
}

export interface ListDto {
  id: number;
  title: string;
}

export const useAddListEffect = (type: GuideType) => {
  const { mutate: addList, loading } = useCustomMutation({
    url: `/${type}list`,
    method: 'POST',
    cacheTag: `${type}list`,
    successMessage: '创建列表成功',
    errorMessage: '创建列表失败',
  });

  const onSubmit = (values: { [key: string]: string }) => {
    const { title } = values;
    addList({ data: { title } });
  };

  const createFormModalParam: CreateFormModalParams = {
    title: '新建列表',
    onSubmit,
    okText: '新建列表',
    onCancel: () => {},
    cancelText: '取消',
    formModalItems: [
      {
        name: 'title',
        label: '标题',
        type: 'text',
        defaultValue: '',
        placeholder: '请输入标题',
        validate: (value: string) =>
          value.length <= 0 ? '标题不能为空' : undefined,
      },
    ],
  };

  const onAdd = () => {
    createFormModal(createFormModalParam);
  };

  return { onAdd, loading };
};

export const useDelListEffect = ({ type, listId }: DelListParams) => {
  const { mutate: delList, loading: delLoading } = useCustomMutation({
    cacheTag: `${type}list`,
    url: `/${type}list/${listId}`,
    method: 'DELETE',
    successMessage: '删除列表成功',
    errorMessage: '删除列表失败',
  });

  const onDel = () => {
    Modal.confirm({
      content: '确定要删除吗？一旦删除无法恢复！',
      okText: '确认删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => delList({}),
    });
  };

  return { onDel, delLoading };
};

export const useSetListEffect = ({ listId, title, type }: SetListParams) => {
  const { mutate: setList, loading: setLoading } = useCustomMutation({
    url: `/${type}list/${listId}`,
    method: 'PUT',
    cacheTag: `${type}list`,
    successMessage: '更新列表成功',
    errorMessage: '更新列表失败',
  });

  const onSubmit = (values: { [key: string]: string }) => {
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
    onSubmit,
    okText: '更新',
    onCancel: () => {},
    cancelText: '取消',
    formModalItems: [
      {
        name: 'title',
        label: '标题',
        type: 'text',
        defaultValue: title,
        placeholder: '请输入标题',
        validate: (value: string) =>
          value.length <= 0 ? '标题不能为空' : undefined,
      },
    ],
  };

  const onSet = () => {
    createFormModal(createFormModalParam);
  };

  return { onSet, setLoading };
};

export const useGetListEffect = (type: GuideType) => {
  const { data, isLoading, isError } = useQuery([`${type}list`], () =>
    axios.get(`/${type}list`)
  );

  const list = data?.data.message.list as ListDto[];

  return {
    list,
    isLoading,
    isError,
  };
};
