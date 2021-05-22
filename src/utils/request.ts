import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { message } from 'antd';

axios.defaults.baseURL = 'http://localhost:5000';

export const setBearerToken = (token: string) => {
  axios.defaults.headers['Authorization'] = `Bearer ${token}`;
};

interface mutationParam {
  url: string;
  cacheTag: string;
  method: 'POST' | 'PUT' | 'DELETE';
  successMessage: string;
  errorMessage: string;
}

export const useCustomMutation = (initState: mutationParam) => {
  const { url, cacheTag, method, successMessage, errorMessage } = initState;

  const queryClient = useQueryClient();

  const [loading, setLoading] = useState<boolean>(false);

  const { mutate } = useMutation(
    ({ params, data }: { params?: any; data?: any }) => {
      setLoading(true);
      message.info('网络请求中');

      return axios({
        url,
        method,
        data,
        params,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(cacheTag); // 使缓存失效，重新发起请求
        setLoading(false);
        message.destroy();
        message.success(successMessage);
      },
      onError: (error) => {
        setLoading(false);
        message.destroy();
        message.error(errorMessage);
      },
    }
  );

  return { mutate, loading };
};

export const useQueryPagination = (url: string, take: number) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [list, setList] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchData = useCallback(
    async (url: string, page: number, take: number) => {
      const { data } = await axios.get<{
        message: {
          total: number;
          list: any[];
        };
      }>(url, { params: { take, page } });

      const total = data.message.total;
      const newList = data.message.list;

      if (newList.length > 0) {
        setList((list: any) => [...list, ...newList]);
        setTotal(total);
        setHasMore(page * take < total);
      }
    },
    []
  );

  const nextPage = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, [setPage]);

  useEffect(() => {
    if (!hasMore) {
      console.log('no more');
      return;
    }

    try {
      setLoading(true);
      fetchData(url, page, take);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [fetchData, setLoading, setError, url, page, take, hasMore]);

  return {
    loading,
    error,
    list,
    setPage,
    page,
    take,
    total,
    hasMore,
    nextPage,
  };
};
