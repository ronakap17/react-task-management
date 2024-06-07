import React from "react";
import classes from './style.module.scss';
import UserImage from '~/assets/images/profile.jpg';

interface Sidebar {
  toggleSidebar: () => void;
}

const Header: React.FC<Sidebar> = ({toggleSidebar}) => {
  return (
    <div className={classes["header"]}>
      <i className={`bx bx-menu ${classes["sidebar-toggle"]}`} onClick={toggleSidebar}></i>

      <img src={UserImage} alt="" />
    </div>
  );
};

export default Header;
