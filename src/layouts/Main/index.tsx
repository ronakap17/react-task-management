import React, { useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import classes from "./style.module.scss";
import { AppLoader } from "./Loader/AppLoader";
import { useAppDispatch, useAppSelector } from "~/store";
import { fetchUserDetails } from "~/pages/Auth/actions";

const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const title = useAppSelector((state) => state.appData.header.title)
  
  useEffect(() => {
    dispatch(fetchUserDetails())
  }, []);
  
  return (
    <>
      <Sidebar />
      <section className={classes["dashboard"]}>
        <Header />
        <section className={classes["container"]}>
          <div className={classes["text"]}>{title}</div>
          <div className={classes["content"]}>
            <Outlet />
          </div>
        </section>
      </section>
      <AppLoader />
    </>
  );
};

export default MainLayout;
