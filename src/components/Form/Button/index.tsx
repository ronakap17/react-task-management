import { Link, LinkProps } from "react-router-dom";
import classes from "./style.module.scss";
import classNames from "classnames";
import Loader from "~/components/Loader";

type HTMLButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  Omit<LinkProps, "to">;

export interface ButtonProps extends HTMLButtonProps {
  to?: string;
  link?: boolean;
  color?: "primary" | "warn" | "success" | "danger";
  loading?: boolean;
}

export type ButtonComponent = React.FC<ButtonProps>;

const Button: ButtonComponent = ({
  className,
  type = "button",
  to,
  link,
  color,
  children,
  loading,
  ...props
}) => {
  console.log(color);
  const buttonProps: HTMLButtonProps = {
    ...props,
    className: classNames(
      classes["button"],
      {
        [classes["disabled"]]: props.disabled,
        [classes["link"]]: link,
      },
      color ? classes[color] : undefined,
      className
    ),
    disabled: props.disabled,
  };

  const content = loading ? <Loader inverse/> : children;
  if (to) {
    // @ts-ignore
    return (
      <Link {...buttonProps} to={to}>
        {content}
      </Link>
    );
  }

  return <button {...buttonProps}>{content}</button>;
};

export default Button;
