import axios from 'axios';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { message } from 'antd';

axios.defaults.baseURL = 'http://localhost:5000';

interface mutationParam {
  cacheTag: string;
  url: string;
  method: 'POST' | 'PUT' | 'DELETE';
  successMessage: string;
  errorMessage: string;
  pathParam?: string;
}

export const useCustomMutation = <P, D>(initState: mutationParam) => {
  let { url } = initState;

  const { cacheTag, method, successMessage, errorMessage, pathParam } =
    initState;

  if (pathParam) {
    url += pathParam;
  }

  const queryClient = useQueryClient();

  const [loading, setLoading] = useState<boolean>(false);

  const { mutate } = useMutation(
    ({ params, data }: { params?: P; data?: D }) => {
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
        queryClient.invalidateQueries(cacheTag); // 使缓存失效
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

export const setBearerToken = (token: string) => {
  axios.defaults.headers['Authorization'] = `Bearer ${token}`;
};
