import { useDispatch } from "react-redux";
import { Form, Formik } from "formik";
import PropTypes from "prop-types";

import { signUpValidation, signInValidation } from "./formValidation.js";
import { signUp, signIn } from "../../model/slices/sessionSlice.js";

import { TextInput, PasswordInput } from "./FormElements.jsx";

import s from "./styles/SignForm.module.scss";

const initialValues = {
  SIGNUP: {
    username: "",
    password: "",
    password_confirmation: "",
    is_admin: false,
  },
  SIGNIN: {
    username: "",
    password: "",
  },
};

const SignForm = ({ isSignUp }) => {
  const dispatch = useDispatch();
  const submitBtnValue = isSignUp ? "Create account" : "Login";

  const action = isSignUp ? signUp : signIn;

  const handleSubmit = (values) => {
    dispatch(action({ ...values }));
  };

  return (
    <Formik
      initialValues={isSignUp ? initialValues.SIGNUP : initialValues.SIGNIN}
      validationSchema={isSignUp ? signUpValidation : signInValidation}
      onSubmit={(values) => handleSubmit(values)}
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
