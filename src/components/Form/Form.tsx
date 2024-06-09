import classNames from "classnames";
import { useCallback } from "react";
import classes from "./style.module.scss";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  className?: string;
}

const Form: React.FC<FormProps> = ({ className, children, onSubmit, ...props }) => {
  const formSubmitHandler = useCallback((e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(e);
    }
  }, [onSubmit]);

  return (
    <form className={classNames(classes['form'], className)} {...props} onSubmit={formSubmitHandler}>
      {children}
    </form>
  );
};

export default Form;