import React from "react";
import classes from "./style.module.scss";

type WrapperProps = {
  title: string;
  children?: React.ReactNode;
}

type WrapperComponent = React.FC<WrapperProps>;

const Wrapper: WrapperComponent = ({title, children}) => {
    return (
      <section className={classes["container"]}>
        <header>{title}</header>
        {children}
      </section>
    );
  };

  export default Wrapper