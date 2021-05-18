import React, { useState } from 'react';
import styled from 'styled-components';
import { Pagination as AntdPagination, Button, message } from 'antd';
import { Modal } from '../modal';
import { GuideType } from '../../common/interface';
import axios from 'axios';
import { useQueryClient, useMutation } from 'react-query';

interface Props {
  type: GuideType;
  total: number;
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
}

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJzaGlubmt1NzIxIiwibmlja25hbWUiOiJzaGlua3U3MjEiLCJhdmF0YXIiOiJodHRwczovL2RlbW8uY29tIiwiZGVzYyI6IlRoaXMgaXMgc2hpbm5rdTcyMSIsImlhdCI6MTYyMTM0NDQwMywiZXhwIjoxNjIxOTQ5MjAzfQ.5a49eRII1uoTAyk2n6e7JY2PHetkv4_VVSOUQtg8L5Y';

const useAddList = (type: GuideType) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (title: string) =>
      axios.post(
        `http://localhost:5000/${type}list`,
        {
          title,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`${type}list`); // 使缓存失效
      },
    }
  );

  return { mutate };
};

export const ToolBar: React.FC<Props> = (props) => {
  const { type, pageSize, total, page, setPage } = props;

  const [open, setOpen] = useState<boolean>(false);

  const { mutate } = useAddList(type);

  const confirmCb = (values: { [key: string]: string }) => {
    const { title } = values;

    mutate(title);
    setOpen(false);
    message.success('新建列表成功！');
  };

  const cancelCb = () => {
    setOpen(false);
  };

  return (
    <Wrapper>
      <Button
        style={{ marginRight: '1rem' }}
        onClick={() => {
          setOpen(true);
        }}
      >
        新建列表
      </Button>
      {total > pageSize ? (
        <Pagination
          current={page}
          defaultCurrent={page}
          defaultPageSize={pageSize}
          pageSize={pageSize}
          total={total}
          onChange={(page) => setPage(page)}
        />
      ) : null}
      <Modal
        title={'新建列表'}
        open={open}
        confirmCb={confirmCb}
        cancelCb={cancelCb}
        confirmText={'新建列表'}
        cancelText={'取消'}
        formItems={[
          {
            key: 'title',
            name: 'title',
            label: '列表标题',
            rules: [{ required: true, message: '列表标题不能为空' }],
            placeholder: '请输入列表标题',
          },
        ]}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 4.5rem;
  border-bottom: 1px solid #fff;
  display: flex;
  align-items: center;
  padding-left: 2rem;
`;

const Pagination = styled(AntdPagination)`
  color: #fff !important;
`;
