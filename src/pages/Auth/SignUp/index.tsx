const SignUp: React.FC = () => {
  return (
    <section className="container">
      <header>Registration</header>
      <form action="#" className="form">
        <div className="input-box">
          <label>Email</label>
          <input type="text" placeholder="Enter email address" required />
        </div>

        <div className="input-box">
          <label>Password</label>
          <input type="password" placeholder="Enter Password" required />
        </div>
        <button>SIGN IN</button>
      </form>
    </section>
  );
};

export default SignUp;
