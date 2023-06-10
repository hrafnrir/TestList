import { Form, Formik } from "formik";
import PropTypes from "prop-types";

import { signUpValidation, signInValidation } from "./formValidation.js";

import { TextInput, PasswordInput } from "./FormElements.jsx";

import s from "./styles/SignForm.module.scss";

const initialValues = {
  username: "",
  password: "",
  password_confirmation: "",
  is_admin: false,
};

const SignForm = ({ isSignUp }) => {
  const submitBtnValue = isSignUp ? "Create account" : "Login";

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={isSignUp ? signUpValidation : signInValidation}
    >
      <Form className={s.form}>
        <TextInput type="text" name="username" placeholder="Username*" />
        <PasswordInput name="password" placeholder="Password*" />

        {isSignUp && (
          <PasswordInput
            name="password_confirmation"
            placeholder="Confirm your password*"
          />
        )}

        <input
          className={s.submitBtn}
          type="submit"
          value={submitBtnValue}
        ></input>
      </Form>
    </Formik>
  );
};

SignForm.propTypes = {
  isSignUp: PropTypes.bool.isRequired,
};

export default SignForm;
