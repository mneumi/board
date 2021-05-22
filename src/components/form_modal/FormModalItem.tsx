import React from 'react';
import { FormItem, Input, Select } from 'formik-antd';
import { Upload } from '../upload';

export type FormModalItemType =
  | 'upload:image'
  | 'upload:file'
  | 'selector'
  | 'text';

export type setFieldValueType = (
  field: string,
  value: unknown,
  shouldValidate?: boolean | undefined
) => void;

export interface SelectOptionType {
  displayName: string;
  value: string;
}

export interface FormModalItemProps {
  name: string;
  label: string;
  type: FormModalItemType;
  defaultValue: unknown;
  notRequired?: boolean;
  placeholder?: string;
  validate?: (value: any) => string | undefined;
  setFieldValue?: setFieldValueType;
  selectOptions?: SelectOptionType[];
}

export const FormModalItem: React.FC<FormModalItemProps> = (props) => {
  const {
    name,
    label,
    type,
    notRequired,
    placeholder,
    validate,
    setFieldValue,
    selectOptions,
  } = props;

  let JSXFragment: React.ReactNode | null = null;

  switch (type) {
    case 'text':
      JSXFragment = <Input name={name} placeholder={placeholder} />;
      break;
    case 'upload:image':
    case 'upload:file':
      JSXFragment = (
        <>
          <Input
            name={name}
            placeholder={placeholder}
            style={{ display: 'none' }}
          />
          <Upload
            type={type === 'upload:image' ? 'image' : 'file'}
            fieldName={name}
            setFieldValue={setFieldValue!}
          />
        </>
      );
      break;
    case 'selector':
      JSXFragment = (
        <Select name={name} placeholder={placeholder}>
          {selectOptions?.map((item) => (
            <Select.Option value={item.value}>{item.displayName}</Select.Option>
          ))}
        </Select>
      );
      break;
  }

  return (
    <FormItem
      name={name}
      label={label}
      required={!notRequired}
      validate={validate}
    >
      {JSXFragment}
    </FormItem>
  );
};
