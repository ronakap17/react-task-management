import React from "react";
import classes from "./style.module.scss";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <section className={classes["container"]}>
      <Outlet />
    </section>
  );
};

export default AuthLayout;
