import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { GuideType } from '../../common/interface';
import { useCustomMutation, useQueryPagination } from '../../utils/request';
import {
  createFormModal,
  CreateFormModalParams,
} from '../form_modal/createFormModal';
import {
  FormModalItemProps,
  FormModalItemType,
  SelectOptionType,
} from '../form_modal/FormModalItem';

const buildFormModalItem = (
  name: string,
  label: string,
  type: FormModalItemType,
  defaultValue: any,
  selectOptions?: SelectOptionType[]
) => ({
  name,
  label,
  type,
  defaultValue,
  placeholder: `请输入${label}`,
  selectOptions,
  validate: (value: any) =>
    value.length <= 0 ? `${label}不能为空` : undefined,
});

export const useAddCardEffect = (type: GuideType, listId: number) => {
  let formModalItems: FormModalItemProps[] = [];
  switch (type) {
    case 'todo':
      formModalItems = [buildFormModalItem('content', '内容', 'text', '')];
      break;
    case 'link':
      formModalItems = [
        buildFormModalItem('url', '链接地址', 'text', ''),
        buildFormModalItem('title', '标题', 'text', ''),
        buildFormModalItem('image', '图片', 'upload:file', ''),
      ];
      break;
    case 'music':
      formModalItems = [
        buildFormModalItem('song', '歌曲名称', 'text', ''),
        buildFormModalItem('singer', '歌手', 'text', ''),
        buildFormModalItem('language', '歌曲语言', 'selector', '', [
          {
            displayName: '中文',
            value: 'chinese',
          },
          {
            displayName: 'English',
            value: 'english',
          },
        ]),
        buildFormModalItem('coverImg', '封面图', 'upload:image', ''),
        buildFormModalItem('songUrl', '上传音乐', 'upload:file', ''),
      ];
      break;
  }

  const { mutate: addCard, loading } = useCustomMutation({
    url: `/${type}`,
    method: 'POST',
    cacheTag: `${type}`,
    successMessage: '创建列表成功',
    errorMessage: '创建列表失败',
  });

  const onSubmit = (values: { [key: string]: any }) => {
    values = { ...values, listId };
    addCard({ data: values });
  };

  const createFormModalParam: CreateFormModalParams = {
    title: '新建卡片',
    okText: '新建卡片',
    onSubmit,
    cancelText: '取消',
    onCancel: () => {},
    formModalItems: formModalItems,
  };

  const onAdd = () => {
    createFormModal(createFormModalParam);
  };

  return { onAdd, loading };
};

// interface LinkCardType {
//   listId: number;
//   url: string;
//   title: string;
//   image: string;
// }

// interface MusicCardType {
//   listId: number;
//   song: string;
//   singer: string;
//   coverImg: string;
//   songUrl: string;
//   language: 'english' | 'chinese';
// }

export const useGetCardEffect = (type: GuideType, take = 4) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError } = useQuery(
    [`${type}`, { take, page }],
    ({ queryKey }) => {
      const { take, page } = queryKey[1] as { take: number; page: number };
      return axios.get(`/${type}`, {
        params: {
          take,
          page,
        },
      });
    }
  );

  useEffect(() => {
    queryClient.invalidateQueries(`${type}list`);
  }, [page, type, queryClient]);

  const list = data?.data.message.list;
  const total = data?.data.message.total ?? 0;
  const pageCount = Math.ceil(total / take);

  return {
    list,
    pageCount,
    total,
    isLoading,
    isError,
    page,
    take,
    setPage,
  };
};
