import React, { useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import classes from "./style.module.scss";
import { AppLoader } from "./Loader/AppLoader";
import { useAppDispatch } from "~/store";
import { fetchUserDetails } from "~/pages/Auth/actions";

const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchUserDetails())
  }, [])
  return (
    <>
      <Sidebar />
      <section className={classes["dashboard"]}>
        <Header />
        <section className={classes["container"]}>
          <div className={classes["text"]}>Dashboard Sidebar</div>
          <Outlet />
        </section>
      </section>
      <AppLoader />
    </>
  );
};

export default MainLayout;
