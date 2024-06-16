import React, { useCallback, useContext, useEffect, useState } from "react";
import classes from "./style.module.scss";
import Logo from "~/assets/logo.png";
import { ThemeContext } from "~/providers/ThemeProvider";
import { useDispatch } from "react-redux";
import { authAction } from "~/pages/Auth/slice";

interface Sidebar {
  open: boolean
}

const Sidebar: React.FC<Sidebar> = ({open}) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );
  }, [theme]);

  const logoutHandler = useCallback(() => {
    dispatch(authAction.logout())
  }, [])

  return (
    <nav className={`${classes["sidebar"]} ${!open ? classes["close"] : ''}  ${classes[theme]}`}>
      <header>
        <div className={classes["image-text"]}>
          <span className={classes["image"]}>
            <img src={Logo} alt="" />
          </span>

          <div className={`${classes["text"]} ${classes["logo-text"]}`}>
            <span className={classes["name"]}>Codinglab</span>
            <span className={classes["profession"]}>Web developer</span>
          </div>
        </div>
      </header>

      <div className={classes["menu-bar"]}>
        <div className={classes["menu"]}>
          <li className={classes["search-box"]}>
            <i className={`bx bx-search ${classes["icon"]}`}></i>
            <input type="text" placeholder="Search..." />
          </li>

          <ul className={classes["menu-links"]}>
            <li className={classes["nav-link"]}>
              <a href="#">
                <i className={`bx bx-home-alt ${classes["icon"]}`}></i>
                <span className={`${classes["text"]} ${classes["nav-text"]}`}>Dashboard</span>
              </a>
            </li>

            <li className={classes["nav-link"]}>
              <a href="#">
                <i className={`bx bx-bar-chart-alt-2 ${classes["icon"]}`}></i>
                <span className={`${classes["text"]} ${classes["nav-text"]}`}>Revenue</span>
              </a>
            </li>

            <li className={classes["nav-link"]}>
              <a href="#">
                <i className={`bx bx-bell ${classes["icon"]}`}></i>
                <span className={`${classes["text"]} ${classes["nav-text"]}`}>Notifications</span>
              </a>
            </li>

            <li className={classes["nav-link"]}>
              <a href="#">
                <i className={`bx bx-pie-chart-alt ${classes["icon"]}`}></i>
                <span className={`${classes["text"]} ${classes["nav-text"]}`}>Analytics</span>
              </a>
            </li>

            <li className={classes["nav-link"]}>
              <a href="#">
                <i className={`bx bx-heart ${classes["icon"]}`}></i>
                <span className={`${classes["text"]} ${classes["nav-text"]}`}>Likes</span>
              </a>
            </li>

            <li className={classes["nav-link"]}>
              <a href="#">
                <i className={`bx bx-wallet ${classes["icon"]}`}></i>
                <span className={`${classes["text"]} ${classes["nav-text"]}`}>Wallets</span>
              </a>
            </li>
          </ul>
        </div>

        <div className={classes["bottom-content"]}>
          <li className="">
            <a onClick={logoutHandler}>
              <i className={`bx bx-log-out ${classes["icon"]}`}></i>
              <span className={`${classes["text"]} ${classes["nav-text"]}`}>Logout</span>
            </a>
          </li>

          <li className={classes["mode"]}>
            <div className={classes["sun-moon"]}>
              <i className={`bx bx-moon ${classes["icon"]} ${classes["moon"]}`}></i>
              <i className={`bx bx-sun ${classes["icon"]} ${classes["sun"]}`}></i>
            </div>
            <span className={`${classes["text"]} ${classes["mode-text"]}`}>Dark mode</span>

            <div className={classes["toggle-switch"]} onClick={toggleTheme}>
              <span className={classes["switch"]}></span>
            </div>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
