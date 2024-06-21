import classes from "./style.module.scss";
import useForm, { UseFormOptionFields } from "~/components/Form/hooks/useForm";
import { useCallback, useMemo } from "react";
import { email, required } from "~/utils/validation";
import Loader from "~/components/Loader";
import useTranslation from "~/hooks/useTranslation";
import SignUpForm from "./Form";
import { ActionFunction, Link, json, redirect } from "react-router-dom";
import store from "~/store";
import { userRegister } from "../actions";
import { RegisterPayload } from "~/types/user";
import { AppError, RouteError } from "~/types/app";
import i18next from "i18next";
import Wrapper from "../Wrapper";

const SignUp: React.FC = () => {
  const { t } = useTranslation("auth.register");
  const requiredValidation = useCallback(required, []);
  const emailValidation = useCallback(email, []);
  const formFields = useMemo<UseFormOptionFields>(
    () => [
      ["name", { validators: [["required", requiredValidation]] }],
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

  const { values } = useForm<RegisterPayload>({
    formName: "signUp",
    fields: formFields,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      img: undefined
    },
  });

  if (!values) {
    return <Loader size="32" />;
  }
  return (
    <Wrapper title={t("title")}>
      <SignUpForm />
      <Link to="/auth/sign-in" className={classes['sign-in-link']}> Already have account? Login </Link>
    </Wrapper>
  );
};

export default SignUp;

export const action: ActionFunction = async ({ request }) => {
  const requestData = await request.formData();

  try {
    const response = await store.dispatch(userRegister(requestData));

    if (userRegister.rejected.match(response)) {
      let err = response.payload as AppError;
      console.log(response)
      return json<RouteError>({ message: err.message });
    }
    return redirect("/");
  } catch (error) {
    throw json<RouteError>(
      { message: i18next.t("system.error.unknown") }
    );
  }
  return {};
};
