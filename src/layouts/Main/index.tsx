import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import classes from "./style.module.scss";

const MainLayout: React.FC = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebar((open) => !open);
  };
  return (
    <>
      <Sidebar open={openSidebar} />
      <section className={classes["dashboard"]}>
        <Header toggleSidebar={toggleSidebar} />
        <section className={classes["container"]}>
          <div className={classes["text"]}>Dashboard Sidebar</div>
          <Outlet />
        </section>
      </section>
    </>
  );
};

export default MainLayout;
