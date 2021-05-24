import { Modal } from 'antd';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
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

interface SetCardParams {
  type: GuideType;
  cardId: number;
  listId: number;
  dto: LinkDto | MusicDto | TodoDto;
}

interface DelCardParams {
  type: GuideType;
  cardId: number;
  setPage: (v: number) => void;
}

const buildFormModalItem = (
  name: string,
  label: string,
  type: FormModalItemType,
  defaultValue: string,
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

export interface TodoDto {
  content: string;
}

export interface MusicDto {
  song: string;
  singer: string;
  coverImg: string;
  songUrl: string;
  language: 'chinese' | 'english';
}

export interface LinkDto {
  url: string;
  title: string;
  image: string;
}

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
        buildFormModalItem('image', '图片', 'upload:image', ''),
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

  const list = data?.data.message.list as any[];
  const total = data?.data.message.total ?? 0;
  const pageCount = Math.ceil(total / take);

  const canPrev = page > 1 ? true : false;
  const canNext = page * take < total ? true : false;

  const prevPage = useCallback(() => {
    if (canPrev) {
      setPage((prev) => prev - 1);
    }
  }, [canPrev, setPage]);

  const nextPage = useCallback(() => {
    if (canNext) {
      setPage((prev) => prev + 1);
    }
  }, [setPage, canNext]);

  return {
    list,
    pageCount,
    total,
    isLoading,
    isError,
    page,
    take,
    setPage,
    nextPage,
    prevPage,
    canPrev,
    canNext,
  };
};

export const useDelCardEffect = ({ type, cardId, setPage }: DelCardParams) => {
  const { mutate: delCard, loading: delLoading } = useCustomMutation({
    cacheTag: `${type}`,
    url: `/${type}/${cardId}`,
    method: 'DELETE',
    successMessage: '删除卡片成功',
    errorMessage: '删除卡片失败',
  });

  const onDel = () => {
    Modal.confirm({
      content: '确定要删除吗？一旦删除无法恢复！',
      okText: '确认删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        delCard({});
        setPage(1);
      },
    });
  };

  return { onDel, delLoading };
};

export const useSetCardEffect = ({
  cardId,
  dto,
  type,
  listId,
}: SetCardParams) => {
  let formModalItems: FormModalItemProps[] = [];
  switch (type) {
    case 'todo':
      const todoObj = dto as TodoDto;
      formModalItems = [
        buildFormModalItem('content', '内容', 'text', todoObj.content),
      ];
      break;
    case 'link':
      const linkObj = dto as LinkDto;
      formModalItems = [
        buildFormModalItem('url', '链接地址', 'text', linkObj.url),
        buildFormModalItem('title', '标题', 'text', linkObj.title),
        buildFormModalItem('image', '图片', 'upload:image', linkObj.image),
      ];
      break;
    case 'music':
      const musicObj = dto as MusicDto;
      formModalItems = [
        buildFormModalItem('song', '歌曲名称', 'text', musicObj.song),
        buildFormModalItem('singer', '歌手', 'text', musicObj.singer),
        buildFormModalItem(
          'language',
          '歌曲语言',
          'selector',
          musicObj.language,
          [
            {
              displayName: '中文',
              value: 'chinese',
            },
            {
              displayName: 'English',
              value: 'english',
            },
          ]
        ),
        buildFormModalItem(
          'coverImg',
          '封面图',
          'upload:image',
          musicObj.coverImg
        ),
        buildFormModalItem(
          'songUrl',
          '上传音乐',
          'upload:file',
          musicObj.songUrl
        ),
      ];
      break;
  }

  const { mutate: setCard, loading: setLoading } = useCustomMutation({
    url: `/${type}/${cardId}`,
    method: 'PUT',
    cacheTag: `${type}`,
    successMessage: '更新卡片成功',
    errorMessage: '更新卡片失败',
  });

  const onSubmit = (values: { [key: string]: any }) => {
    values = { ...values, listId };
    setCard({ data: values });
  };

  const createFormModalParam: CreateFormModalParams = {
    title: '编辑卡片',
    onSubmit,
    okText: '更新',
    onCancel: () => {},
    cancelText: '取消',
    formModalItems: formModalItems,
  };

  const onSet = () => {
    createFormModal(createFormModalParam);
  };

  return { onSet, setLoading };
};
