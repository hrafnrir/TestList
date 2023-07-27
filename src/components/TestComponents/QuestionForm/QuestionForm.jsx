import { useState } from "react";
import { Form, Formik } from "formik";
import Select from "react-select";
import { nanoid } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import cn from "classnames";

import { questionTypes } from "../constants.js";
import { commonValidation, getSubmittingValidation } from "./formValidation.js";

import TextAnswerElements from "./TextAnswerElements.jsx";
import { TextInput, NumberAnswer } from "./FormElements.jsx";

import s from "./styles/QuestionForm.module.scss";
import "./styles/DropDown.css";

const questionTypeOptions = [
  { value: questionTypes.SINGLE, label: "One from a list" },
  { value: questionTypes.MULTIPLE, label: "Several from a list" },
  { value: questionTypes.NUMBER, label: "Numerical answer" },
];

const QuestionForm = ({ isNew, question, onSubmit, onCancel }) => {
  const [type, setType] = useState(
    isNew ? questionTypes.SINGLE : question.type
  );
  const [error, setError] = useState(null);

  const defaultQuestionType = questionTypeOptions.find(
    ({ value }) => value === type
  );

  const clearFormValues = {
    title: "",
    number_answer: "",
    answers: [
      { id: nanoid(), value: "", isRight: false },
      { id: nanoid(), value: "", isRight: false },
    ],
  };

  const handleQuestionTypeChange = ({ value }) => {
    setType(value);
    error && setError(null);
  };

  const handleFormSubmit = ({
    id = nanoid(),
    title,
    answers,
    number_answer,
  }) => {
    if (type === questionTypes.NUMBER) {
      if (!getSubmittingValidation({ type, setError, number_answer })) return;

      onSubmit({ id, title, type, number_answer });
    } else {
      if (!getSubmittingValidation({ type, setError, answers })) return;

      const filteredAnswers = answers.filter(
        ({ value }) => value.trim() !== ""
      );

      onSubmit({ id, title, type, answers: filteredAnswers });
    }

    onCancel();
  };

  const rootClass = cn(s.root, { [s.root_new]: isNew });

  return (
    <Formik
      initialValues={
        isNew ? clearFormValues : { ...clearFormValues, ...question }
      }
      validationSchema={commonValidation}
      onSubmit={(values) => handleFormSubmit(values)}
    >
      <Form className={rootClass}>
        <TextInput
          type="text"
          name="title"
          label="Question"
          placeholder="Enter your question..."
        />

        <div className={s.wrapper}>
          <div className={s.inputLabel}>Type:</div>
          <Select
            classNamePrefix="reactSelect"
            unstyled
            name="question_type"
            defaultValue={defaultQuestionType}
            options={questionTypeOptions}
            isSearchable={false}
            blurInputOnSelect={false}
            onChange={handleQuestionTypeChange}
          />
        </div>

        {type === questionTypes.NUMBER ? (
          <>
            <NumberAnswer name="number_answer" label="Answer" placeholder="0" />
            {error && <div className={s.warn}>{error}</div>}
          </>
        ) : (
          <TextAnswerElements name="answers">
            {error && <div className={s.warn}>{error}</div>}
          </TextAnswerElements>
        )}

        <div className={s.buttonsWrapper}>
          <button className={s.mainBtn} type="button" onClick={onCancel}>
            Cancel
          </button>
          <button className={s.mainBtn} type="submit">
            Save
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default QuestionForm;

QuestionForm.propTypes = {
  isNew: PropTypes.bool.isRequired,
  question: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};