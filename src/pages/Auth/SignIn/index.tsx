import Text from "~/components/Form/Text";
import classes from "./style.module.scss";
import Button from "~/components/Form/Button";
import Form from "~/components/Form/Form";
const SignIn: React.FC = () => {
  return (
    <section className={classes["container"]}>
      <header>Login</header>
      <Form className={classes["form"]}>
        <Text label="Email" placeholder="Enter email address" required/>
        <Text label="Password" placeholder="Enter Password" required/>
        <Button color="primary" loading>SIGN IN</Button>
      </Form>
    </section>
  );
};

export default SignIn;
