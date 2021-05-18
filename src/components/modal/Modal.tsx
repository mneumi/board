import React from 'react';
import { Modal as AntdModal, Button, Form, Input, FormItemProps } from 'antd';
import styled from 'styled-components';

interface Props {
  title: string;
  open: boolean;
  confirmText: string;
  cancelText: string;
  formItems: FormItem[];
  confirmCb: (values: { [key: string]: string }) => void;
  cancelCb: () => void;
}

interface FormItem extends FormItemProps {
  key: string;
  placeholder: string;
}

export const Modal: React.FC<Props> = (props) => {
  const {
    title,
    open,
    confirmCb,
    cancelCb,
    confirmText,
    cancelText,
    formItems,
  } = props;

  const onFinish = (values: { [key: string]: string }) => {
    confirmCb(values);

    // 清空input框内容
    formItems.forEach((item) => {
      const fieldName = item.name?.toString()!;
      form.setFieldsValue({
        [fieldName]: null,
      });
    });
  };

  const [form] = Form.useForm();

  return (
    <AntdModal
      title={title}
      visible={open}
      closable={false}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {formItems.map((item) => {
          return (
            <Form.Item
              name={item.name}
              label={item.label}
              rules={item.rules}
              key={item.key}
            >
              <Input allowClear placeholder={item.placeholder} />
            </Form.Item>
          );
        })}
        <FormController>
          <Button onClick={cancelCb}>{cancelText}</Button>
          <Button type="primary" htmlType="submit">
            {confirmText}
          </Button>
        </FormController>
      </Form>
    </AntdModal>
  );
};

const FormController = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
  > * {
    margin-right: 1rem;
  }
`;
