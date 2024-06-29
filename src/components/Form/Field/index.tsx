import React from "react";
import classes from "./style.module.scss";
import { FieldError } from "../slice";
import classNames from "classnames";
import Icon, { IconProps } from "~/components/Icon";
import Loader from "~/components/Loader";

export interface FieldProps {
  className?: string;
  label?: React.ReactNode;
  children?: React.ReactNode;
  loading?: boolean;
  icon?: IconProps["name"] | React.ReactElement;
  iconPosition?: "left" | "right";
  iconSize?: IconProps["size"];
  iconWrapperClass?: string;
  errors?: FieldError[];
}

export type FieldComponent = React.FC<FieldProps>;

const Field: FieldComponent = ({
  className,
  label,
  children,
  loading,
  icon,
  iconPosition,
  iconSize,
  iconWrapperClass,
  errors,
}) => {
  if ((icon || loading) && !iconPosition) {
    iconPosition = "right";
  }
  if (icon && !iconSize) {
    iconSize = 20;
  }
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
      {!!label && <label>{label}</label>}
      <div
        className={classNames(classes["input-wrap"], {
          [classes["icon-left"]]: iconPosition === "left",
          [classes["icon-right"]]: iconPosition === "right",
        })}
      >
        {children}
        {(!!icon || loading) && (
          <div
            className={classNames(classes["icon-wrap"], iconWrapperClass, {
              [classes["icon-element"]]: typeof icon !== "string",
            })}
          >
            {loading ? (
              <Loader />
            ) : typeof icon === "string" ? (
              <Icon name={icon} size={iconSize} />
            ) : (
              icon
            )}
          </div>
        )}
      </div>
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
