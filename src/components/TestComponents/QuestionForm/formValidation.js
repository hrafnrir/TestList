import * as Yup from "yup";

import { questionTypes } from "../constants.js";

const emptyError = (field) => `${field} is required.`;

export const commonValidation = Yup.object({
  title: Yup.string()
    .trim(emptyError("Question"))
    .required(emptyError("Question")),
});

export const getSubmittingValidation = ({
  type,
  setError,
  number_answer = "",
  answers = [],
}) => {
  if (type === questionTypes.NUMBER) {
    if (number_answer === "") {
      setError(emptyError("Answer"));
      return;
    }

    return true;
  }

  if (!answers.filter(({ value }) => value.trim())[1]) {
    setError("Must be two answers at minimum.");
    return;
  }

  const rightAnswers = answers.filter(({ isRight }) => isRight);

  if (type === questionTypes.SINGLE) {
    if (!rightAnswers[0] || rightAnswers[1]) {
      setError("Must be one right answer.");
      return;
    }
  } else {
    if (!rightAnswers[1]) {
      setError("Must be two right answers at minimum.");
      return;
    }
  }

  return true;
};
