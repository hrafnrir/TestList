import * as Yup from "yup";

import { questionTypes } from "../constants.js";

const emptyError = (field) => `${field} is required.`;

export const commonValidation = Yup.object({
  title: Yup.string()
    .trim(emptyError("Question"))
    .required(emptyError("Question")),
});

export const getSubmittingValidation = ({
  question_type,
  setError,
  answer,
  answers,
}) => {
  if (question_type === questionTypes.NUMBER) {
    if (answer === "") {
      setError(emptyError("Answer"));
      return;
    }

    return true;
  }

  if (!answers.filter(({ text }) => text.trim())[1]) {
    setError("Must be two answers at minimum.");
    return;
  }

  const rightAnswers = answers.filter(({ is_right }) => is_right);

  if (question_type === questionTypes.SINGLE) {
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
