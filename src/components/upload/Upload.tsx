import React, { useState } from 'react';
import { Upload as AntdUpload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { setFieldValueType } from '../form_modal/FormModalItem';
import { getToken } from '../auth/auth.service';

interface Props {
  fieldName: string;
  setFieldValue: setFieldValueType;
  type: 'image' | 'file';
}

export const Upload: React.FC<Props> = (props) => {
  const { fieldName, setFieldValue, type } = props;
  const [hasUpload, setHasUpload] = useState<boolean>(false);

  const listType = type === 'image' ? 'picture' : 'text';

  const onChange = (info: any) => {
    if (info.file.status === 'done') {
      const url = info.file.response.message.url;
      setFieldValue(fieldName, url);
      setHasUpload(true);
    } else if (info.file.status === 'error') {
      message.error('上传失败');
    }
  };

  return (
    <AntdUpload
      name="file"
      action="http://localhost:5000/upload"
      headers={{ Authorization: `Bearer ${getToken()}` }}
      listType={listType}
      onChange={onChange}
      onRemove={() => setHasUpload(false)}
    >
      <Button icon={<UploadOutlined />} disabled={hasUpload}>
        点击上传
      </Button>
    </AntdUpload>
  );
};
