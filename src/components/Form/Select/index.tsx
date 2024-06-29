import React from 'react';

import Field, { FieldProps } from '../Field';
import useField from '../hooks/useField';

import classes from './style.module.scss';

type SelectOption = {
  text: React.ReactNode,
  value: string | number
}

export interface SelectPropsDefault extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  ref?: React.Ref<HTMLSelectElement>
  options?: SelectOption[]
}

export type SelectProps = SelectPropsDefault & FieldProps

export type SelectComponent = React.ForwardRefRenderFunction<HTMLSelectElement, SelectProps>

const Select: SelectComponent = (props, ref) => {
  
  const {
    fieldProps: { icon = 'bx-chevron-down', iconPosition = 'right', iconSize = 24, ...fieldProps },
    inputProps: { options, onChange, value, ...othersInputProps }
  } = useField<SelectPropsDefault>(props);

  return (
    <Field
      icon={icon}
      iconPosition={iconPosition}
      iconSize={iconSize}
      {...fieldProps}
    >
      <select
        ref={ref}
        className={`${classes['input']} ${classes['select']}`}
        {...othersInputProps}
        value={value}
        disabled={othersInputProps.disabled}
        onChange={onChange}
      >
        {options && options.map(option => <option key={option.value} value={option.value}>{option.text}</option>)}
      </select>
    </Field>
  );
};

export default React.forwardRef(Select)
