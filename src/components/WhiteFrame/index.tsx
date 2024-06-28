import classNames from "classnames";
import classes from "./style.module.scss";

type WhiteFrameProps = {
  children?: React.ReactNode;
  className?: string;
};
const WhiteFrame: React.FC<WhiteFrameProps> = ({ children, className }) => {
  return <div className={classNames(classes['wrapper'], className)}>{children}</div>;
};

export default WhiteFrame;
