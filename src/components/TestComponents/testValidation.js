import { validationErrorTypes } from "./constants";

export const getValidation = ({ title, questions, setError }) => {
  if (!title.trim() || !questions[0]) {
    !title.trim() &&
      setError((prevState) => ({
        ...prevState,
        [validationErrorTypes.TITLE]: "Title is required.",
      }));

    !questions[0] &&
      setError((prevState) => ({
        ...prevState,
        [validationErrorTypes.QUESTION]: "Must be at least one question.",
      }));

    return;
  }

  return true;
};
