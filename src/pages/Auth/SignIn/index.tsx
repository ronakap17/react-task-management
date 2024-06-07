import classes from "./style.module.scss";
const SignIn: React.FC = () => {
  return (
    <section className={classes["container"]}>
      <header>Login</header>
      <form action="#" className={classes["form"]}>
        <div className={classes["input-box"]}>
          <label>Email</label>
          <input type="text" placeholder="Enter email address" required />
        </div>

        <div className={classes["input-box"]}>
          <label>Password</label>
          <input type="password" placeholder="Enter Password" required />
        </div>
        <button>SIGN IN</button>
      </form>
    </section>
  );
};

export default SignIn;
