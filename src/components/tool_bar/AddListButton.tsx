import React from 'react';
import styled from 'styled-components';
import { Button as AntdButton } from 'antd';
import { GuideType } from '../../common/interface';
import { createFormModal } from '../form_modal/createFormModal';
import { useAddListEffect } from '../list/hooks';

interface Props {
  type: GuideType;
}

export const AddListButton: React.FC<Props> = (props) => {
  const { type } = props;

  const { loading, createFormModalParam } = useAddListEffect(type);

  return (
    <React.Fragment>
      <Button
        loading={loading}
        onClick={() => createFormModal(createFormModalParam)}
      >
        新建列表
      </Button>
    </React.Fragment>
  );
};

const Button = styled(AntdButton)`
  margin-right: 1rem;
`;
