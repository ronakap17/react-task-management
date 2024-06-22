import React, { useContext, useEffect } from "react";
import classes from "./style.module.scss";
import { ThemeContext } from "~/providers/ThemeProvider";
import { useAppSelector } from "~/store";
import classNames from "classnames";
import SidebarHeader from "./Header";
import SidebarMenu from "./Menu";

const Sidebar: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const isOpen = useAppSelector(state => state.layout.appSidebar.isOpen)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <nav
      className={classNames(
        classes["sidebar"],
        !isOpen && classes["close"],
        classes[theme]
      )}
    >
      <SidebarHeader/>
      <SidebarMenu />
    </nav>
  );
};

export default Sidebar;
