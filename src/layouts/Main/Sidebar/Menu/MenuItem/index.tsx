import classes from "./../../style.module.scss";
import { sidebarMenuItem } from "~/data/sidebar";
import MenuLink from "./MenuLink";
import classNames from "classnames";
import Icon from "~/components/Icon";

const MenuItem: React.FC<sidebarMenuItem> = ({ title, link, icon, onClick, children, className }) => {
  return (
    <li className={classNames(classes["nav-link"], className)}>
      <MenuLink
        link={link}
        onClick={onClick}
      >
        <Icon name={icon} size={20} className={classes["icon"]} />
        <span className={`${classes["text"]} ${classes["nav-text"]}`}>
          {title}
        </span>
        {children}
      </MenuLink>
    </li>
  );
};

export default MenuItem;
