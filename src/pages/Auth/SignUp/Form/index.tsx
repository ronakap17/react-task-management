import Text from "~/components/Form/Text";
import classes from "./style.module.scss";
import Button from "~/components/Form/Button";
import Form from "~/components/Form/Form";
import useForm from "~/components/Form/hooks/useForm";
import useTranslation from "~/hooks/useTranslation";
import { FormEvent, useCallback } from "react";
import { useActionData, useNavigation, useSubmit } from "react-router-dom";
import { RegisterPayload } from "~/types/user";
import { RouteError } from "~/types/app";
import FlashMessage from "~/components/FlashMessage";
import File from "~/components/Form/File";

const SignUpForm: React.FC = () => {
  const { t } = useTranslation("auth.register.form");

  const { state } = useNavigation();
  const actionData = useActionData() as RouteError;
  const isSubmitting = state === "submitting";
  const submit = useSubmit();

  const {
    values,
    fieldEvents,
    errors,
    formEvents: { onSubmit },
  } = useForm<RegisterPayload>({
    formName: "signUp",
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
    <Form className={classes["form"]} onSubmit={onFormSubmit} method="post" encType="multipart/form-data">
      {actionData?.message && (
        <FlashMessage text={actionData?.message} type="error" />
      )}
      <Text
        label={t("name.label")}
        name="name"
        defaultValue={values.name}
        placeholder={t("name.placeholder")}
        {...fieldEvents}
        errors={errors.name}
      />
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
      <File
        label={t("img.label")}
        name="img"
        defaultValue={values.img}
        placeholder={t("img.placeholder")}
        {...fieldEvents}
        errors={errors.img}
        accept="image/*"
        preview={true}
      />
      <Button
        color="primary"
        type="submit"
        disabled={isSubmitting}
        loading={isSubmitting}
      >
        {t("submit")}
      </Button>
    </Form>
  );
};

export default SignUpForm;
