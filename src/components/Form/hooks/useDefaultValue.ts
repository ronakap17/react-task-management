import { useRef } from 'react';

export interface UseDefaultValue {
  (defaultValue: any): typeof defaultValue
}

const useDefaultValue: UseDefaultValue = defaultValue => {
  const defaultValueRef = useRef(defaultValue);

  return defaultValueRef.current;
};

export default useDefaultValue
