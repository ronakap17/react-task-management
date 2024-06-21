import classes from "./style.module.scss";
import useForm, { UseFormOptionFields } from "~/components/Form/hooks/useForm";
import { useCallback, useMemo } from "react";
import { email, required } from "~/utils/validation";
import Loader from "~/components/Loader";
import useTranslation from "~/hooks/useTranslation";
import SignInForm from "./Form";
import { ActionFunction, Link, json, redirect } from "react-router-dom";
import store from "~/store";
import { userLogin } from "../actions";
import { LoginPayload } from "~/types/user";
import { AppError, RouteError } from "~/types/app";
import i18next from "i18next";
import Wrapper from "../Wrapper";

const SignIn: React.FC = () => {
  const { t } = useTranslation("auth.login");
  const requiredValidation = useCallback(required, []);
  const emailValidation = useCallback(email, []);
  const formFields = useMemo<UseFormOptionFields>(
    () => [
      [
        "email",
        {
          validators: [
            ["required", requiredValidation],
            ["email", emailValidation],
          ],
        },
      ],
      ["password", { validators: [["required", requiredValidation]] }],
    ],
    [requiredValidation, emailValidation]
  );

  const { values } = useForm<LoginPayload>({
    formName: "login",
    fields: formFields,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  if (!values) {
    return <Loader size="32" />;
  }
  return (
    <Wrapper title={t("title")}>
      <SignInForm />
      <Link to="/auth/sign-up" className={classes['sign-up-link']}> Don't have account? Singup </Link>
    </Wrapper>
  );
};

export default SignIn;

export const action: ActionFunction = async ({ request }) => {
  const requestData = await request.formData();
  const data: LoginPayload = {
    email: requestData.get("email") as string || "",
    password: requestData.get("password") as string || "",
  };

  try {
    const response = await store.dispatch(userLogin(data));

    if (userLogin.rejected.match(response)) {
      let err = response.payload as AppError;
      return json<RouteError>({ message: err.message });
    }
    return redirect("/");
  } catch (error) {
    throw json<RouteError>({ message: i18next.t("system.error.unknown") });
  }
  return {};
};
