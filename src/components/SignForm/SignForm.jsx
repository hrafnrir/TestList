import PropTypes from "prop-types";

import s from "./styles/SignForm.module.scss";

const SignForm = ({ isSignUp }) => {
  const submitBtnValue = isSignUp ? "Create account" : "Login";

  return (
    <form className={s.form}>
      <div className={s.wrapper}>
        <input
          className={s.input}
          type="text"
          name="username"
          placeholder="Username*"
        ></input>
        <span className={s.warn}></span>
      </div>
      <div className={s.wrapper}>
        <input
          className={s.input}
          type="text"
          name="password"
          placeholder="Password*"
        ></input>
      </div>

      {isSignUp && (
        <div className={s.wrapper}>
          <input
            className={s.input}
            type="text"
            name="password-confirmation"
            placeholder="Confirm your password*"
          ></input>
        </div>
      )}

      <input
        className={s.submitBtn}
        type="submit"
        value={submitBtnValue}
      ></input>
    </form>
  );
};

SignForm.propTypes = {
  isSignUp: PropTypes.bool.isRequired,
};

export default SignForm;
