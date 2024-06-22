import classes from "./../../style.module.scss";
import { sidebarMenuItem } from "~/data/sidebar";
import MenuLink from "./MenuLink";
import classNames from "classnames";

const MenuItem: React.FC<sidebarMenuItem> = ({ title, link, icon, onClick, children, className }) => {
  return (
    <li className={classNames(classes["nav-link"], className)}>
      <MenuLink
        link={link}
        onClick={onClick}
      >
        <i className={`bx ${icon} ${classes["icon"]}`}></i>
        <span className={`${classes["text"]} ${classes["nav-text"]}`}>
          {title}
        </span>
        {children}
      </MenuLink>
    </li>
  );
};

export default MenuItem;
