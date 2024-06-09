import React from "react";
import useField from "../hooks/useField";
import classes from "./style.module.scss";
import Field, { FieldProps } from "../Field";

export interface TextPropsDefault
  extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>;
  inputClassName?: string;
}

export type TextProps = TextPropsDefault & FieldProps;

export type TextComponent = React.ForwardRefRenderFunction<
  HTMLInputElement,
  TextProps
>;

const Text: TextComponent = (props, ref) => {
  const {
    fieldProps,
    inputProps: { inputClassName, ...othersInputProps },
  } = useField(props);
  return (
    <Field {...fieldProps}>
      <input
        {...othersInputProps}
        ref={ref}
        type={othersInputProps.type || "text"}
        className={`${classes["input-box"]} ${inputClassName}`}
        disabled={othersInputProps.disabled}
      />
    </Field>
  );
};

export default React.forwardRef(Text);
