import * as Yup from "yup";

import { questionTypes } from "./constants.js";

const emptyError = (field) => `${field} is required.`;

export const commonValidation = Yup.object({
  question: Yup.string()
    .trim(emptyError("Question"))
    .required(emptyError("Question")),
});

export const getValidationBeforeSubmitting = ({
  type,
  setError,
  numberAnswer = "",
  textAnswers = [],
}) => {
  if (type === questionTypes.NUMBER) {
    if (numberAnswer === "") {
      setError(emptyError("Answer"));
      return;
    }

    return true;
  }

  if (!textAnswers.filter(({ value }) => value.trim())[1]) {
    setError("Must be two answers at minimum.");
    return;
  }

  const rightAnswers = textAnswers.filter(({ isRight }) => isRight);

  if (type === questionTypes.SINGLE) {
    if (!rightAnswers[0] || rightAnswers[1]) {
      setError("Must be one right answer.");
      return;
    }

    return true;
  }

  if (!rightAnswers[1]) {
    setError("Must be two right answers at minimum.");
    return;
  }

  return true;
};
