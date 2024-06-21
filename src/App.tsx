import "./i18n/index";
import "./App.css";
import useTranslation from "./hooks/useTranslation";

function App() {
  const { t } = useTranslation("app");

  return <div>{t("title")}</div>;
}

export default App;
