import { NavLink } from "react-router-dom";
import classes from "./../../../style.module.scss";

interface MenuItemProps {
  onClick?: React.MouseEventHandler;
  link?: string;
  children?: React.ReactNode;
}

const MenuLink: React.FC<MenuItemProps> = ({ link, onClick, children }) => {
  if (onClick) {
    return <a onClick={onClick}>{children}</a>;
  } else if (link) {
    return (
      <NavLink
        to={link || ""}
        className={({ isActive }) =>
          isActive && !onClick ? classes["active"] : ""
        }
      >
        {children}
      </NavLink>
    );
  } else {
    return <a>{children}</a>;
  }
};

export default MenuLink;
