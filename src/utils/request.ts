import { message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJzaGlubmt1NzIxIiwibmlja25hbWUiOiJzaGlua3U3MjEiLCJhdmF0YXIiOiJodHRwczovL2RlbW8uY29tIiwiZGVzYyI6IlRoaXMgaXMgc2hpbm5rdTcyMSIsImlhdCI6MTYyMTM0NDQwMywiZXhwIjoxNjIxOTQ5MjAzfQ.5a49eRII1uoTAyk2n6e7JY2PHetkv4_VVSOUQtg8L5Y';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers['Authorization'] = `Bearer ${token}`;

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
    ({data, params}: { data?: D; params?: P }) => {
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
