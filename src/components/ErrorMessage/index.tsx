import React from "react";
import { Trans } from "react-i18next";

import classes from "./style.module.scss";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export type ErrorMessageComponent = React.FC;

const ErrorMessage: ErrorMessageComponent = () => {
  const error = useRouteError();
  let errorMessage: string = '';

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }
  
  return (
    <h1 className={classes["error"]}>
      Oops!
      <p className={classes["message"]}>
        {errorMessage || 
        <Trans i18nKey="system.error.default" />}
      </p>
    </h1>
  );
};

export default ErrorMessage;
