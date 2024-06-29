import { useMemo } from "react";
import classes from "./style.module.scss";
import classNames from "classnames";
import Icon, { IconProps } from "../Icon";
interface FlashMessageType {
  type?: "error" | "warning" | "info" | "success";
  icon?: IconProps['name'];
  text: string;
}
const FlashMessage: React.FC<FlashMessageType> = ({ type, icon, text }) => {
  const bxIcon = useMemo<IconProps['name'] | ''>(() => {
    if (icon) {
      return icon;
    }

    switch (type) {
      case "error":
        return "bx-error";
      case "warning":
        return "bx-error";
      case "success":
        return "bx-success";
      case "info":
        return "bx-info-circle";
      default:
        return "";
    }
  }, [type, icon]);

  return (
    <div className={classNames(classes["msg-container"], type && classes[type])}>
      {bxIcon && <Icon className={`${classes["icon"]}`} name={bxIcon} />}
      <div className={classes["content"]}>{text}</div>
    </div>
  );
};

export default FlashMessage;
