import { useMemo, useState } from "react";
import { FieldProps } from "../Field";

type UseFieldProps<T> = FieldProps & T;

export interface UseFieldData<T> {
  fieldProps: FieldProps;
  inputProps: T;
}

export interface UseField {
  <T>(defaultProps: UseFieldProps<T>): UseFieldData<T>;
}

const useField: UseField = <T>(defaultProps) => {
  const data = useMemo<UseFieldData<T>>(() => {
    const { className, label, errors, ...inputProps } = defaultProps;

    return {
      fieldProps: {
        className, label, errors
      },
      inputProps: inputProps as T
    }
  }, [defaultProps]);

  return data;
};

export default useField;
