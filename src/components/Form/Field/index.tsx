import React from "react";
import classes from "./style.module.scss";
import { FieldError } from "../slice";
import classNames from "classnames";

export interface FieldProps {
  className?: string;
  label?: React.ReactNode;
  children?: React.ReactNode;
  //   loading?: boolean;
  errors?: FieldError[];
}

export type FieldComponent = React.FC<FieldProps>;

const Field: FieldComponent = ({ className, label, children, errors }) => {
  return (
    <div
      className={classNames(
        classes["input-box"],
        {
          [classes["has-errors"]]: errors && errors.length,
        },
        className
      )}
    >
      <label>{label}</label>
      {children}
      {/*{!!errors && (
        <div
          className={classes['errors']}
          dangerouslySetInnerHTML={{ __html: (Array.isArray(errors) ? errors.join('<span>&bull;</span>') : errors) }}
        />
      )}*/}
    </div>
  );
};

export default Field;
