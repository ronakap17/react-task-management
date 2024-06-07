import { useState } from "react";
import "./i18n/index";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useTranslation from "./hooks/useTranslation";

function App() {
  const { t } = useTranslation("app");

  return <div>{t("title")}</div>;
}

export default App;
