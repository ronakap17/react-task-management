import ToggleSwitch from "~/components/Form/ToggleSwitch";
import classes from "./../style.module.scss";
import { useCallback, useContext } from "react";
import { ThemeContext } from "~/providers/ThemeProvider";
import { authAction } from "~/pages/Auth/slice";
import { useAppDispatch } from "~/store";
import MenuItem from "./MenuItem";
import { sidebarMenuItems } from "~/data/sidebar";
const SidebarMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const logoutHandler = useCallback(async () => {
    dispatch(authAction.logout());
  }, []);

  return (
    <div className={classes["menu-bar"]}>
      <div className={classes["menu"]}>
        <ul className={classes["menu-links"]}>
          {sidebarMenuItems.map((item) => (
            <MenuItem key={item.title} {...item} />
          ))}
        </ul>
      </div>

      <div className={classes["bottom-content"]}>
        <MenuItem key="Logout" icon="bx-log-out" title="Logout" onClick={logoutHandler}/>
        <MenuItem key="Dark mode" icon={theme === "dark" ? "bx-sun" : "bx-moon"} title="Dark mode" className={classes["mode"]}>
            <ToggleSwitch enabled={theme === "dark"} onClick={toggleTheme} />
        </MenuItem>
      </div>
    </div>
  );
};

export default SidebarMenu;
