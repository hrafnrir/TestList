import { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import Select from "react-select";
import { nanoid } from "@reduxjs/toolkit";
import PropTypes from "prop-types";

import { questionTypes } from "./constants.js";
import { TextInput, TextAnswer, NumberAnswer } from "./FormElements.jsx";
import {
  commonValidation,
  getValidationBeforeSubmitting,
} from "./formValidation.js";

import s from "./styles/QuestionForm.module.scss";
import "./styles/DropDown.css";

const questionTypeOptions = [
  { value: questionTypes.SINGLE, label: "One from a list" },
  { value: questionTypes.MULTIPLE, label: "Several from a list" },
  { value: questionTypes.NUMBER, label: "Numeric answer" },
];

const initialAnswers = [
  { id: nanoid(), value: "", isRight: false },
  { id: nanoid(), value: "", isRight: false },
];

const clearFormValues = {
  question: "",
};

const QuestionForm = ({ isNew, question }) => {
  const [questionType, setQuestionType] = useState(questionTypeOptions[0]);
  const [textAnswers, setTextAnswers] = useState(initialAnswers);
  const [textAnswerElements, setTextAnswerElements] = useState([]);
  const [removal, setRemoval] = useState(false);
  const [removedTextAnswer, setRemovedTextAnswer] = useState(null);
  const [numberAnswer, setNumberAnswer] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    setTextAnswerElements(
      textAnswers.map(({ id, value, isRight }, index) => {
        return (
          <TextAnswer
            key={id}
            commonId={id}
            id={`text_answer_${id}`}
            name={`text_answer_${id}`}
            label={`Answer #${index + 1}`}
            initialValue={value}
            isRight={isRight}
            onAnswerChange={handleTextAnswerChange}
            onCheckboxChange={handleTextAnswerCheck}
            removal={removal}
            onRemove={handleTextAnswerRemove}
          />
        );
      })
    );
  }, [textAnswers, removal]);

  useEffect(() => {
    removedTextAnswer !== null &&
      setTextAnswers(textAnswers.filter(({ id }) => id !== removedTextAnswer));
  }, [removedTextAnswer]);

  useEffect(() => {
    if (textAnswers.length < 3 && removal) setRemoval(false);
    if (textAnswers.length > 2 && !removal) setRemoval(true);
  }, [textAnswers.length]);

  const handleQuestionTypeChange = (option) => {
    setQuestionType(option);
    error && setError(null);
  };

  const handleTextAnswerChange = (id, value) => {
    setTextAnswers(
      textAnswers.map((item) => {
        if (item.id === id) {
          item.value = value;
        }

        return item;
      })
    );
  };

  const handleTextAnswerCheck = (id, isRight) => () => {
    setTextAnswers(
      textAnswers.map((item) => {
        if (item.id === id) {
          item.isRight = isRight;
        }

        return item;
      })
    );
  };

  const handleAddNewTextAnswer = () => {
    setTextAnswers((prevState) => [
      ...prevState,
      { id: nanoid(), value: "", isRight: false },
    ]);
  };

  const handleTextAnswerRemove = (id) => () => {
    setRemovedTextAnswer(id);
  };

  const handleNumberAnswerChange = (number) => {
    setNumberAnswer(String(number));
  };

  const handleFormSubmit = (value) => {
    if (questionType.value === questionTypes.NUMBER) {
      if (
        !getValidationBeforeSubmitting({
          type: questionType.value,
          setError,
          numberAnswer,
        })
      )
        return;
    }

    if (questionType.value === questionTypes.SINGLE) {
      if (
        !getValidationBeforeSubmitting({
          type: questionType.value,
          setError,
          textAnswers,
        })
      )
        return;
    }

    error && setError(null);
  };

  return (
    <Formik
      initialValues={!isNew ? question : clearFormValues}
      validationSchema={commonValidation}
      onSubmit={(values) => handleFormSubmit(values)}
    >
      <Form className={s.root}>
        <TextInput
          type="text"
          name="question"
          id="question"
          label="Question"
          placeholder="Enter your question..."
        />

        <div className={s.wrapper}>
          <div className={s.inputLabel}>Type:</div>
          <Select
            classNamePrefix="reactSelect"
            unstyled
            name="question_type"
            defaultValue={questionType}
            options={questionTypeOptions}
            isSearchable={false}
            blurInputOnSelect={false}
            onChange={handleQuestionTypeChange}
          />
        </div>

        {questionType.value === questionTypes.NUMBER ? (
          <NumberAnswer
            id="number_answer"
            name="number_answer"
            initialValue={numberAnswer}
            label="Answer"
            placeholder="0"
            onChange={handleNumberAnswerChange}
          />
        ) : (
          textAnswerElements
        )}

        {error && <div className={s.warn}>{error}</div>}

        <div className={s.buttonsWrapper}>
          {questionType.value !== questionTypes.NUMBER && (
            <button
              className={s.addAnswerBtn}
              type="button"
              onClick={handleAddNewTextAnswer}
            ></button>
          )}

          <button className={s.mainBtn} type="button">
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
};
