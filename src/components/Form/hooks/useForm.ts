import { FocusEvent, ChangeEvent, useCallback, useEffect, useRef, useMemo, FormEvent } from 'react';
import { isEqual } from 'lodash';

import { Field, FieldValue, FormState, FieldErrors, formFields, formState, getValues, getValidators, getErrors, formAction } from '../slice';
import { useAppDispatch, useAppSelector } from '~/store';

export type FormValues<T> = {
  [key in keyof T]: FieldValue
}
export type FormErrors<T> = {
  [key in keyof T]: FieldErrors
}

type HTMLFieldElements = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

type FormSubmitPayload<T> = {
  formState: FormState
  values: FormValues<T>
  errors: FormErrors<T>
}

export type UseFormOptionFields = ([string, Partial<Field>] | string)[];

export interface UseFormOptions<T> {
  formName: string
  fields?: UseFormOptionFields
  validationTrigger?: 'onSubmit' | 'onBlur' | 'onChange'
  defaultValues?: FormValues<T>
  onChange?: (values: FormValues<T>) => void
}

export interface UseFormData<T> {
  formState: FormState
  removeForm: () => void
  values: FormValues<T>
  defaultValues?: FormValues<T>
  setValue: (name: keyof T, value: any) => void
  errors: FormErrors<T>
  fieldEvents: {
    onBlur: (data: FocusEvent<HTMLFieldElements>) => void
    onChange: (data: ChangeEvent<HTMLFieldElements>) => void
  },
  formEvents: {
    onSubmit: (callback: (data: FormSubmitPayload<T>) => void) => (e?: FormEvent<HTMLFormElement>) => void
  }
}

export interface UseForm {
  <T>(options: UseFormOptions<T>): UseFormData<T>
}

const useForm: UseForm = <T>(options: UseFormOptions<T>) => {
  const fields = useRef<UseFormOptionFields | undefined>(options.fields);
  const defaultValues = useRef<FormValues<T> | undefined>(options.defaultValues);
  const dispatch = useAppDispatch();

  const storeFormFields = useAppSelector(state => formFields(state, options.formName));
  const storeFormState = useAppSelector(state => formState(state, options.formName));
  const storeValues = useAppSelector(state => getValues(state, options.formName));
  const storeValidators = useAppSelector(state => getValidators(state, options.formName));
  const storeErrors = useAppSelector(state => getErrors(state, options.formName));

  const removeForm = useCallback(() => {
    dispatch(formAction.removeForm({formName: options.formName}))
  }, [options.formName]);

  const addError = useCallback((name, error) => {
    dispatch(formAction.addError({ formName: options.formName, name, error }))
  }, [options.formName]);
  const removeError = useCallback((name, error) => {
    dispatch(formAction.removeError({ formName: options.formName, name, error }))
  }, [options.formName]);

  const triggerValidation = useCallback((name: keyof T, value: any): FieldErrors => {
    const errors: FieldErrors = [];

    if (storeValidators[(name as string)]) {
      Object.keys(storeValidators[(name as string)]).forEach(key => {
        const field = storeFormFields[name as string];

        const validationResult = storeValidators[(name as string)][key](
          { name, value, errors: field.errors, state: field.state },
          { state: storeFormState, values: (storeValues as FormValues<T>), errors: (storeErrors as FormErrors<T>) }
        );

        if (validationResult) {
          removeError(name, key);
        } else {
          addError(name, key);

          errors.push(key);
        }
      });
    }

    return errors;
  }, [storeValidators, storeFormFields, storeFormState, storeValues, storeErrors, removeError, addError]);

  const setValue = useCallback((name, value) => {
    const errorsKeys = Object.keys(storeErrors);

    if (options.validationTrigger === 'onChange' || errorsKeys.length) {
      errorsKeys.forEach(key => {
        triggerValidation(key as keyof T, (key === name ? value : storeFormFields[key].value));
      });
    }

    dispatch(formAction.setValue({ formName: options.formName, name, value }))
  }, [options.formName, options.validationTrigger, storeErrors, storeFormFields, triggerValidation]);

  const getInputValue = useCallback(
    (type, value) => (type === 'number' ? (value === '' ? null : +value) : value),
    []
  );

  const onBlur = useCallback(({ target: { type, name, value } }) => {
    value = getInputValue(type, value);

    if (!options.validationTrigger || options.validationTrigger === 'onBlur') {
      triggerValidation(name, value);
    }
  }, [getInputValue, options.validationTrigger, triggerValidation]);
  const onChange = useCallback(({ target: { type, name, value } }) => {
    value = getInputValue(type, value);

    setValue(name, value);
  }, [getInputValue, setValue]);

  const onSubmit = useCallback(callback => e => {
    if (e) {
      e.preventDefault();
    }

    const errors = {};
    
    Object.keys(storeValidators).forEach(name => {
      const e = triggerValidation((name as keyof T), (storeValues || {})[name]);

      if (e.length) {
        errors[name] = e;
      }
    });
    
    callback({
      formState: { ...storeFormState, invalid: !!Object.keys(errors).length },
      values: storeValues,
      errors
    });
  }, [storeFormState, storeValidators, storeValues, triggerValidation]);
  
  const fieldEvents = useMemo(() => ({ onBlur, onChange }), [onBlur, onChange]);
  const formEvents = useMemo(() => ({ onSubmit }), [onSubmit]);

  useEffect(() => {
    if (fields.current) {
      const fieldsData = {};

      fields.current.forEach(field => {
        if (typeof field === 'string') {
          fieldsData[field] = {};
        } else if (Array.isArray(field)) {
          fieldsData[field[0]] = (field[1] || {});
        }
      });

      dispatch(formAction.addForm({ formName: options.formName, fields: fieldsData }));
    }
  }, [options.formName]);

  useEffect(() => {
    if (options.fields && fields.current && !isEqual(options.fields, fields.current)) {
      const fieldsData = {};

      options.fields.forEach(field => {
        if (typeof field === 'string') {
          fieldsData[field] = {};
        } else if (Array.isArray(field)) {
          fieldsData[field[0]] = (field[1] || {});
        }
      });

      dispatch(formAction.updateForm({ formName: options.formName, fields: fieldsData }))
    }
  }, [options.fields, options.formName]);

  useEffect(() => {
    if (defaultValues.current) {
      dispatch(formAction.setDefaultValues({ formName: options.formName, defaultValues: defaultValues.current }))
    }
  }, [options.formName]);

  useEffect(() => {
    if (options.onChange) {
      options.onChange((storeValues as FormValues<T>));
    }
  }, [options, storeValues]);

  return {
    formState: storeFormState,
    removeForm,
    values: (storeValues as FormValues<T>),
    defaultValues: defaultValues.current,
    setValue,
    errors: (storeErrors as FormErrors<T>),
    fieldEvents,
    formEvents
  }
};

export default useForm
