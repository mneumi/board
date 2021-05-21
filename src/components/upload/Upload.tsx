import React, { useState } from 'react';
import { Upload as AntdUpload } from 'antd';
import ImgCrop from 'antd-img-crop';
import styled from 'styled-components';
import { setFieldValueType } from '../form_modal/FormModalItem';
import './Upload.css';
import { useAuth } from '../auth/hooks';

interface Props {
  setFieldValue: setFieldValueType;
}

interface UploadFileType {
  name: string;
  percent: number;
  status: 'error' | 'success' | 'done' | 'uploading' | 'removed';
  thumbUrl?: string;
  uid: string;
  url: string;
}

export const Upload: React.FC<Props> = (props) => {
  const { setFieldValue } = props;

  const [fileList, setFileList] = useState<UploadFileType[]>([]);
  const { getToken } = useAuth();

  const onChange = (param: any) => {
    setFileList(param.fileList);

    if (param?.file?.response?.message?.url) {
      const url = param.file.response.message.url;

      setFieldValue('imageUrl', url);
    }
  };

  return (
    <ImgCrop>
      <Wrapper
        action="http://localhost:5000/upload"
        headers={{
          Authorization: `Bearer ${getToken()}`,
        }}
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        showUploadList={{ showPreviewIcon: false }}
      >
        {fileList.length < 1 ? '+ Upload' : null}
      </Wrapper>
    </ImgCrop>
  );
};

const Wrapper = styled(AntdUpload)`
  /* width: 10rem !important; */
`;
