import React from 'react';
import ReactDOM from 'react-dom';
import { FormItem, FormModal } from './FormModal';

export interface CreateFormModalParams {
  title: string;
  confirmCb: (values: { [key: string]: any }) => void;
  cancelCb?: () => void;
  confirmText: string;
  cancelText: string;
  formItems: FormItem[];
}

export const createFormModal = (params: CreateFormModalParams) => {
  const { title, confirmCb, cancelCb, confirmText, cancelText, formItems } =
    params;

  const rootDOM = document.getElementById('root');

  const modalDOM = document.createElement('div');
  rootDOM?.appendChild(modalDOM);

  const formModalJSX = (
    <FormModal
      title={title}
      confirmCb={(values) => {
        confirmCb(values);
        rootDOM?.removeChild(modalDOM);
      }}
      cancelCb={() => {
        if (cancelCb) {
          cancelCb();
        }
        rootDOM?.removeChild(modalDOM);
      }}
      confirmText={confirmText}
      cancelText={cancelText}
      formItems={formItems}
      htmlElement={modalDOM}
    />
  );

  ReactDOM.render(formModalJSX, modalDOM);
};
