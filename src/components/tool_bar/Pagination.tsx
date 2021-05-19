import React from 'react';
import { Pagination as AntdPagination } from 'antd';

interface Props {
  total: number;
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
}

export const Pagination: React.FC<Props> = (props) => {
  const { pageSize, total, page, setPage } = props;

  if (total <= pageSize) {
    return null;
  }

  return (
    <AntdPagination
      current={page}
      defaultCurrent={page}
      defaultPageSize={pageSize}
      pageSize={pageSize}
      total={total}
      onChange={(page) => setPage(page)}
    />
  );
};