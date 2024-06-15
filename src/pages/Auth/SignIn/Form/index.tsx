import Text from "~/components/Form/Text";
import classes from "./style.module.scss";
import Button from "~/components/Form/Button";
import Form from "~/components/Form/Form";
import useForm from "~/components/Form/hooks/useForm";
import useTranslation from "~/hooks/useTranslation";
import { FormEvent, useCallback } from "react";
import { useActionData, useNavigation, useSubmit } from "react-router-dom";
import { LoginPayload } from "../../slice";
import { RouteError } from "~/types/app";
import FlashMessage from "~/components/FlashMessage";

const SignInForm: React.FC = () => {
  const { t } = useTranslation("auth.login.form");

  const { state } = useNavigation();
  const actionData = useActionData() as RouteError;
  const isSubmitting = state === "submitting";
  const submit = useSubmit();

  const {
    values,
    fieldEvents,
    errors,
    formEvents: { onSubmit },
  } = useForm<LoginPayload>({
    formName: "login",
  });

  const onFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      onSubmit(({ formState: { invalid } }) => {
        if (invalid) {
          return;
        }
        submit(event.currentTarget);
      })();
    },
    [onSubmit, submit]
  );

  return (
    <Form className={classes["form"]} onSubmit={onFormSubmit} method="post">
      {actionData?.message && (
        <FlashMessage text={actionData?.message} type="error" />
      )}
      <Text
        label={t("email.label")}
        name="email"
        defaultValue={values.email}
        placeholder={t("email.placeholder")}
        {...fieldEvents}
        errors={errors.email}
      />
      <Text
        type="password"
        label={t("password.label")}
        name="password"
        defaultValue={values.password}
        placeholder={t("password.placeholder")}
        {...fieldEvents}
        errors={errors.password}
      />
      <Button
        color="primary"
        type="submit"
        disabled={isSubmitting}
        loading={isSubmitting}
      >
        SIGN IN
      </Button>
    </Form>
  );
};

export default SignInForm;
