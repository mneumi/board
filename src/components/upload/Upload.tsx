import React, { ReactNode, useCallback, useState } from 'react';
import { Upload as AntdUpload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { setFieldValueType } from '../form_modal/FormModalItem';
import { getToken } from '../auth/auth.service';
import styled from 'styled-components';

interface Props {
  fieldName: string;
  setFieldValue: setFieldValueType;
  type: 'image' | 'file';
  defaultValue?: string;
}

export const Upload: React.FC<Props> = (props) => {
  const { fieldName, setFieldValue, type, defaultValue } = props;
  const [hasUpload, setHasUpload] = useState<boolean>(false);

  const listType = type === 'image' ? 'picture' : 'text';

  const onChange = useCallback(
    (info: any) => {
      if (info.file.status === 'done') {
        const url = info.file.response.message.url;
        setFieldValue(fieldName, url);
        setHasUpload(true);
      } else if (info.file.status === 'error') {
        message.error('上传失败');
      }
    },
    [fieldName, setFieldValue]
  );

  const ImageUpload = (defaultValue && !hasUpload) ? (
    <Image alt="" src={defaultValue} />
  ) : (
    <UploadButton disabled={hasUpload}>{'点击上传'}</UploadButton>
  );

  const FileUpload = (
    <UploadButton disabled={hasUpload}>
      {defaultValue ? '重新上传' : '点击上传'}
    </UploadButton>
  );

  return (
    <AntdUpload
      name="file"
      action="http://localhost:5000/upload"
      headers={{ Authorization: `Bearer ${getToken()}` }}
      listType={listType}
      onChange={onChange}
      onRemove={() => setHasUpload(false)}
    >
      {type === 'image' ? ImageUpload : FileUpload}
    </AntdUpload>
  );
};

const UploadButton: React.FC<React.PropsWithChildren<{ disabled: boolean }>> =
  ({ children, disabled }) => {
    return (
      <Button icon={<UploadOutlined />} disabled={disabled}>
        {children}
      </Button>
    );
  };

const Image = styled.img`
  width: 100%;
  height: 10rem;
  object-fit: contain;
`;
