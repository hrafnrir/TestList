import * as Yup from "yup";

const variables = {
  MAX_LENGTH: 30,
  USERNAME_MIN_LENGTH: 3,
  PASSWORD_MIN_LENGTH: 8,
};

const regExp = {
  USERNAME: /^[a-z]+$/,
  PASSWORD: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/g,
};

const emptyError = (field) => `${field} is required.`;

const minLengthError = (minLength) =>
  `Must be ${minLength} characters at minimum.`;

const maxLengthError = (maxLength) =>
  `Must be ${maxLength} characters or less.`;

export const signUpValidation = Yup.object({
  username: Yup.string()
    .min(
      variables.USERNAME_MIN_LENGTH,
      minLengthError(variables.USERNAME_MIN_LENGTH)
    )
    .max(variables.MAX_LENGTH, maxLengthError(variables.MAX_LENGTH))
    .matches(regExp.USERNAME, "Must contain lowercase alpha characters.")
    .required(emptyError("Username")),

  password: Yup.string()
    .min(
      variables.PASSWORD_MIN_LENGTH,
      minLengthError(variables.PASSWORD_MIN_LENGTH)
    )
    .max(variables.MAX_LENGTH, maxLengthError(variables.MAX_LENGTH))
    .matches(
      regExp.PASSWORD,
      "Must contain at least 1 alpha (A-Z), 1 numeric (0-9) and 1 special (!@#$%^&*) characters."
    )
    .required(emptyError("Password")),

  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Password mismatch.")
    .required(emptyError("Password confirmation")),
});

export const signInValidation = Yup.object({
  username: Yup.string().required(emptyError("Username")),

  password: Yup.string().required(emptyError("Password")),
});
