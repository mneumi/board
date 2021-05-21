import React from 'react';
import { Formik } from 'formik';
import { SubmitButton, ResetButton, Form } from 'formik-antd';
import { Modal as AntdModal, Button, Row, Col } from 'antd';
import styled from 'styled-components';
import { FormModalItem, FormModalItemProps } from './FormModalItem';

export interface FormModalProps {
  title: string;
  okText: string;
  cancelText: string;
  onSubmit: (values: any) => void;
  onCancel: () => void;
  formModalItems: FormModalItemProps[];
  htmlElement: HTMLElement;
}

// function validateRequired(value: string) {
//   return value ? undefined : '输入不能为空';
// }

export const FormModal: React.FC<FormModalProps> = (props) => {
  const {
    title,
    onSubmit,
    okText,
    onCancel,
    cancelText,
    formModalItems,
    htmlElement,
  } = props;

  const computeInitialValues = () => {
    return formModalItems.reduce((prev, item) => {
      return {
        ...prev,
        [item.name]: item.defaultValue,
      };
    }, {});
  };

  return (
    <AntdModal
      title={title}
      visible={true}
      closable={false}
      footer={null}
      getContainer={htmlElement}
      destroyOnClose
    >
      <Formik initialValues={computeInitialValues()} onSubmit={onSubmit}>
        {(props) => {
          const { setFieldValue } = props;

          return (
            <Form layout="vertical">
              {formModalItems.map((item) => {
                return (
                  <FormModalItem
                    {...item}
                    key={item.name}
                    setFieldValue={setFieldValue}
                  />
                );
              })}
              <Row>
                <Col offset={8}>
                  <Button.Group>
                    <Button onClick={onCancel}>{cancelText}</Button>
                    <ResetButton>Reset</ResetButton>
                    <SubmitButton>{okText}</SubmitButton>
                  </Button.Group>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
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

/*
<Form form={form} layout="vertical" onFinish={onFinish}>
        {formItems.map((item) => {
          return item?.type === 'upload' ? (
            <>
              <Form.Item
                name={item.name}
                label={item.label}
                rules={item.rules}
                key={item.key}
                initialValue={imageUrl}
              >
                <Input
                  value={imageUrl}
                  defaultValue={imageUrl}
                  // style={{ display: 'none', height: 0 }}
                  allowClear
                  placeholder={item.placeholder}
                />
                <Upload setHasUpload={setHasUpload} setImageUrl={setImageUrl} />
              </Form.Item>
              {imageUrl}
              
            </>
          ) : item?.type === 'selector' && item.selectList ? (
            <Form.Item label={item.label}>
              <Select
                defaultValue={item.selectList[0].value}
                onChange={(value) => console.log(value)}
              >
                {item.selectList.map((item) => (
                  <Select.Option value={item.value}>{item.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          ) : (
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
*/
