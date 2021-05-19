import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { GuideType } from '../../common/interface';

export const useGetList = (type: GuideType, take = 4) => {
  const [page, setPage] = useState<number>(1);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(
    [`${type}list`, { take, page }],
    ({ queryKey }) => {
      const { take, page } = queryKey[1] as { take: number; page: number };
      return axios.get(`/${type}list`, {
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
