import React from 'react';
import { FormItem, Input } from 'formik-antd';
import { Upload } from '../upload';

export type FormModalItemType = 'upload' | 'selector' | 'text';

export type setFieldValueType = (
  field: string,
  value: any,
  shouldValidate?: boolean | undefined
) => void;

export interface FormModalItemProps {
  name: string;
  label: string;
  type: FormModalItemType;
  defaultValue: any;
  notRequired?: boolean;
  placeholder?: string;
  validate?: (value: any) => string | undefined;
  setFieldValue?: setFieldValueType;
}

export const FormModalItem: React.FC<FormModalItemProps> = (props) => {
  const { name, label, type, notRequired, placeholder, validate, setFieldValue } =
    props;

  let inner: any = null;

  switch (type) {
    case 'text':
      inner = <Input name={name} placeholder={placeholder} />;
      break;
    case 'upload':
      inner = (
        <>
          <Input
            name={name}
            placeholder={placeholder}
            style={{ display: 'none' }}
          />
          <Upload setFieldValue={setFieldValue!} />
        </>
      );
      break;
    case 'selector':
      inner = null;
      break;
  }

  return (
    <FormItem name={name} label={label} required={!notRequired} validate={validate}>
      {inner}
    </FormItem>
  );
};
