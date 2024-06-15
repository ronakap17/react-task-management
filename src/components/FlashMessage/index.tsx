import { useMemo } from "react";
import classes from "./style.module.scss";
import classNames from "classnames";
interface FlashMessageType {
  type?: "error" | "warning" | "info" | "success";
  icon?: string;
  text: string;
}
const FlashMessage: React.FC<FlashMessageType> = ({ type, icon, text }) => {
  const bxIcon = useMemo(() => {
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
      {bxIcon && <i className={`bx ${bxIcon} ${classes["icon"]}`}></i>}
      <div className={classes["content"]}>{text}</div>
    </div>
  );
};

export default FlashMessage;
