import React from 'react';
import { Formik } from 'formik';
import { SubmitButton, ResetButton, Form } from 'formik-antd';
import { Modal as AntdModal, Button, Row, Col, Space } from 'antd';
import { FormModalItem, FormModalItemProps } from './FormModalItem';
import styled from 'styled-components';

export interface FormModalProps {
  title: string;
  okText: string;
  cancelText: string;
  onSubmit: (values: { [key: string]: any }) => void;
  onCancel: () => void;
  formModalItems: FormModalItemProps[];
  htmlElement: HTMLElement;
}

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
                <Col offset={5}>
                  <Button.Group>
                    <Button onClick={onCancel}>{cancelText}</Button>
                    <Gap />
                    <ResetButton>重置</ResetButton>
                    <Gap />
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

const Gap = styled.div`
  margin: 0 1rem;
`;
