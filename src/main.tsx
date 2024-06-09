import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/index";
import "./index.scss";
import ThemeProvider from "./providers/ThemeProvider";
import { Provider } from "react-redux";
import { store } from "./store";

import './i18n';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
