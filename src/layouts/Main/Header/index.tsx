import React, { useCallback } from "react";
import classes from "./style.module.scss";
import { useAppDispatch, useAppSelector } from "~/store";
import { appSidebarActions } from "../Sidebar/slice";
import UserAvatar from "~/components/UserAvatar";
import Icon from "~/components/Icon";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const toggleSidebar = useCallback(() => {
    dispatch(appSidebarActions.toggle());
  }, []);

  return (
    <div className={classes["header"]}>
      <Icon
        name={'bx-menu'}
        size={26}
        className={classes["sidebar-toggle"]}
        onClick={toggleSidebar}
      />

      <span className={classes["user-details"]}>
        {user.imgUrl ? (
          <img src={user.imgUrl} alt="User Image" />
        ) : (
          <UserAvatar name={user.name} />
        )}
        <span className={classes["name"]}>{user.name}</span>
      </span>
    </div>
  );
};

export default Header;
