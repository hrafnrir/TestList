import * as Yup from "yup";

const emptyError = (field) => `${field} is required.`;

export const validation = Yup.object({
  question: Yup.string()
    .trim(emptyError("Question"))
    .required(emptyError("Question")),
});
