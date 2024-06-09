import React from "react";
import { Trans } from "react-i18next";

import classes from "./style.module.scss";

export type ErrorMessageComponent = React.FC;

const ErrorMessage: ErrorMessageComponent = () => {
  return (
    <h1 className={classes["error"]}>
      404
      <p className={classes["message"]}>
        <Trans i18nKey="system.errorBoundaryMessage" />
      </p>
    </h1>
  );
};

export default ErrorMessage;
