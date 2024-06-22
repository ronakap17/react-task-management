import useTranslation from "~/hooks/useTranslation";
import classes from "./../style.module.scss";
import Logo from "~/assets/logo.png";
const SidebarHeader: React.FC = () => {
  const {t} = useTranslation('app');
  return (
    <header>
      <div className={classes["image-text"]}>
        <span className={classes["image"]}>
          <img src={Logo} alt="" />
        </span>

        <div className={`${classes["text"]} ${classes["logo-text"]}`}>
          <span className={classes["name"]}>{t('title')}</span>
          <span className={classes["profession"]}>{t('subTitle')}</span>
        </div>
      </div>
    </header>
  );
};

export default SidebarHeader;
