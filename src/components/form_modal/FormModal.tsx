import React from 'react';
import styled from 'styled-components';
import { Modal as AntdModal, Button, Form, Input, FormItemProps } from 'antd';

interface Props {
  title: string;
  confirmText: string;
  cancelText: string;
  formItems: FormItem[];
  confirmCb: (values: { [key: string]: any }) => void;
  cancelCb?: () => void;
  htmlElement: HTMLElement;
}

export interface FormItem extends FormItemProps {
  key: string;
  placeholder: string;
  initialValue?: string;
  clear: boolean;
}

export const FormModal: React.FC<Props> = (props) => {
  const {
    title,
    confirmCb,
    cancelCb,
    confirmText,
    cancelText,
    formItems,
    htmlElement,
  } = props;

  const onFinish = (values: { [key: string]: any }) => {
    confirmCb(values);

    // 清空input框内容
    formItems.forEach((item) => {
      if (!item.clear) {
        return;
      }

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
      visible={true}
      closable={false}
      footer={null}
      destroyOnClose
      getContainer={htmlElement}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {formItems.map((item) => {
          return (
            <Form.Item
              name={item.name}
              label={item.label}
              rules={item.rules}
              key={item.key}
              initialValue={item.initialValue}
            >
              <Input
                // value={item.initialValue}
                // defaultValue={item.initialValue}
                allowClear
                placeholder={item.placeholder}
              />
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
