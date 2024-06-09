import React from "react";
import classes from "./style.module.scss";

export interface FieldProps {
  className?: string;
  label?: React.ReactNode;
  children?: React.ReactNode;
  //   loading?: boolean;
  //   errors?: FieldError[];
}

export type FieldComponent = React.FC<FieldProps>;

const Field: FieldComponent = ({ className, label, children }) => {
  return (
    <div className={`${classes["input-box"]} ${className}`}>
      <label>{label}</label>
      {children}
    </div>
  );
};

export default Field;
