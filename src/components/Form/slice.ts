import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import _, { isEqual } from "lodash";
import { RootState } from "~/store";

export enum ValidatorsEnum {
  required = "required",
  number = "number",
  integer = "integer",
}

export type FieldValue = string | number | string[] | any[];
export interface FieldValidatorFieldData extends Omit<Field, "validators"> {
  name: string;
}
export type FieldValidator = (
  field: FieldValidatorFieldData,
  form: FieldValidatorFormData
) => boolean;
export type FieldValidators = { [key in ValidatorsEnum]: FieldValidator } & {
  [key: string]: FieldValidator;
};
export type FieldError = ValidatorsEnum | string;
export type FieldErrors = FieldError[];
export type FieldState = { touched: boolean; invalid: boolean };

export type Field = {
  value: FieldValue;
  validators: (ValidatorsEnum | [string, FieldValidator])[];
  errors: FieldErrors;
  state: FieldState;
};

export type Fields = { [name: string]: Field };
export type FieldsPayload = { [name: string]: Partial<Field> };

export type FormState = { touched: boolean; invalid: boolean };
export type FormValues = { [name: string]: FieldValue };
export type FormValidators = { [name: string]: FieldValidators[] };
export type FormErrors = { [name: string]: FieldErrors };

export type FieldValidatorFormData = {
  state: FormState;
  values: FormValues;
  errors: FormErrors;
};

const Validators = {
  [ValidatorsEnum.required]: (value: FieldValue) =>
    value !== "" && value !== undefined && value !== null,
  [ValidatorsEnum.number]: (value: FieldValue) => typeof value === "number",
  [ValidatorsEnum.integer]: (value: FieldValue) => Number.isInteger(value),
};

export type initialStateType = {
  forms: {
    [name: string]: Fields;
  };
};

const initialState: initialStateType = { forms: {} };

const formSlice = createSlice({
  name: "AppFrom",
  initialState,
  reducers: {
    addForm(
      state,
      action: PayloadAction<{ formName: string; fields: FieldsPayload }>
    ) {
      const { formName, fields } = action.payload;
      if (!state.forms[formName]) {
        state.forms[formName] = {};
      }

      Object.keys(fields).forEach((name) => {
        state.forms[formName][name] = {
          value: "",
          validators: [],
          errors: [],
          ...fields[name],
          state: { touched: false, invalid: false },
        };
      });
    },
    updateForm(
      state,
      action: PayloadAction<{ formName: string; fields: FieldsPayload }>
    ) {
      const { formName, fields } = action.payload;
      if (!state.forms[formName]) {
        state.forms[formName] = {};
      }

      Object.keys(fields).forEach((name) => {
        state.forms[formName][name] = {
          ...(state.forms[formName][name] || {}),
          ...fields[name],
        };
      });
    },
    removeForm(state, action: PayloadAction<{ formName: string }>) {
      const { formName } = action.payload;
      delete state.forms[formName];
    },
    setValue(
      state,
      action: PayloadAction<{
        formName: string;
        name: string;
        value: FieldValue;
      }>
    ) {
      const { formName, name, value } = action.payload;
      if (state.forms[formName] && state.forms[formName][name]) {
        state.forms[formName][name].value = value;
      }
      formSlice.caseReducers.onSetValue(state, action);
    },

    addError(
      state,
      action: PayloadAction<{
        formName: string;
        name: string;
        error: FieldError;
      }>
    ) {
      const { formName, name, error } = action.payload;
      if (state.forms[formName] && state.forms[formName][name]) {
        const index = state.forms[formName][name].errors.findIndex(
          (e) => e === error
        );

        if (index === -1) {
          state.forms[formName][name].errors.push(error);
        }
      }
      formSlice.caseReducers.onSetError(state, action);
    },
    removeError(
      state,
      action: PayloadAction<{
        formName: string;
        name: string;
        error: FieldError;
      }>
    ) {
      const { formName, name, error } = action.payload;
      if (state.forms[formName] && state.forms[formName][name]) {
        const index = state.forms[formName][name].errors.findIndex(
          (e) => e === error
        );

        if (index !== -1) {
          state.forms[formName][name].errors.splice(index, 1);
        }
      }
      formSlice.caseReducers.onSetError(state, action);
    },
    clearErrors(
      state,
      action: PayloadAction<{ formName: string; name: string }>
    ) {
      const { formName, name } = action.payload;
      if (state.forms[formName] && state.forms[formName][name]) {
        state.forms[formName][name].errors = [];
      }
    },

    setDefaultValues(
      state,
      action: PayloadAction<{ formName: string; defaultValues: FormValues }>
    ) {
      const { formName, defaultValues } = action.payload;
      if (state.forms[formName]) {
        const values: FormValues = {};

        Object.keys(state.forms[formName]).forEach((name) => {
          values[name] = state.forms[formName][name].value;
        });

        if (!isEqual(values, defaultValues)) {
          Object.keys(state.forms[formName]).forEach((name) => {
            state.forms[formName][name].value = defaultValues[name];
          });
        }
      }
    },

    onSetValue(
      state,
      action: PayloadAction<{ formName: string; name: string }>
    ) {
      const { formName, name } = action.payload;
      if (state.forms[formName] && state.forms[formName][name]) {
        state.forms[formName][name].state.touched = true;
      }
    },
    onSetError(
      state,
      action: PayloadAction<{ formName: string; name: string }>
    ) {
      const { formName, name } = action.payload;
      if (state.forms[formName] && state.forms[formName][name]) {
        state.forms[formName][name].state.invalid =
          !!state.forms[formName][name].errors.length;
      }
    },
  },
});

export const formFields = createSelector(
    [(state: RootState) => state.form, (_: any, formName: string) => formName],
    (state: initialStateType, formName: string) => state.forms[formName] || {}
  );

export const getForm = createSelector(
    [(state: RootState) => state.form, (_: any, formName: string) => formName],
    (state: initialStateType, formName: string) => state.forms[formName] || {}
  );

export const formState = createSelector(
    [(state: RootState) => state.form, (_: any, formName: string) => formName],
    (state: initialStateType, formName: string) => {
      if (!state.forms[formName]) {
        return { touched: false, invalid: false };
      }

      let touched = false;
      let invalid = false;

      Object.keys(state.forms[formName]).forEach((name) => {
        if (state.forms[formName][name].state.touched) {
          touched = true;
        }
        if (state.forms[formName][name].state.invalid) {
          invalid = true;
        }
      });

      return { touched, invalid };
    }
  );

export const getValues = createSelector(
    [(state: RootState) => state.form, (_: any, formName: string) => formName],
    (state: initialStateType, formName: string) => {
      if (!state.forms[formName]) {
        return;
      }

      const values: FormValues = {};

      Object.keys(state.forms[formName]).forEach((name) => {
        values[name] = state.forms[formName][name].value;
      });

      return values;
    }
  );

export const getValidators = createSelector(
    [(state: RootState) => state.form, (_: any, formName: string) => formName],
    (state: initialStateType, formName: string) => {
      if (!state.forms[formName]) {
        return {};
      }

      const validators: FormValidators = {};

      Object.keys(state.forms[formName]).forEach((name) => {
        // @ts-ignore
        validators[name] = {};

        state.forms[formName][name].validators.forEach((validator) => {
          if (Array.isArray(validator)) {
            validators[name][validator[0]] = validator[1];
          } else {
            validators[name][validator] = Validators[validator];
          }
        });
      });

      return validators;
    }
  );

export const getErrors = createSelector(
    [(state: RootState) => state.form, (_: any, formName: string) => formName],
    (state: initialStateType, formName: string) => {
      if (!state.forms[formName]) {
        return {};
      }

      const errors: FormErrors = {};

      Object.keys(state.forms[formName]).forEach((name) => {
        if (state.forms[formName][name].errors.length) {
          errors[name] = state.forms[formName][name].errors;
        }
      });

      return errors;
    }
  );

export const formAction = formSlice.actions;
export default formSlice.reducer;
