import React from 'react';
import ReactDOM from 'react-dom';
import { FormModal, FormModalProps } from './FormModal';

export type CreateFormModalParams = Omit<FormModalProps, 'htmlElement'>;

export const createFormModal = (params: CreateFormModalParams) => {
  const { title, onSubmit, okText, cancelText, formModalItems } = params;

  const rootDOM = document.getElementById('root');
  const modalDOM = document.createElement('div');
  rootDOM?.appendChild(modalDOM);

  const formModalJSX = (
    <FormModal
      title={title}
      onSubmit={(values) => {
        onSubmit(values);
        rootDOM?.removeChild(modalDOM);
      }}
      onCancel={() => {
        rootDOM?.removeChild(modalDOM);
      }}
      okText={okText}
      cancelText={cancelText}
      formModalItems={formModalItems}
      htmlElement={modalDOM}
    />
  );

  ReactDOM.render(formModalJSX, modalDOM);
};
