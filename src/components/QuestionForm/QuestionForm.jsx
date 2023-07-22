import { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import Select from "react-select";
import { nanoid } from "@reduxjs/toolkit";
import PropTypes from "prop-types";

import { TextInput, TextAnswer, NumberAnswer } from "./FormElements.jsx";
import { validation } from "./formValidation.js";

import s from "./styles/QuestionForm.module.scss";
import "./styles/DropDown.css";

const typeOptions = [
  { value: "single", label: "One from a list" },
  { value: "multiple", label: "Several from a list" },
  { value: "number", label: "Numeric answer" },
];

const initialAnswers = [
  { id: nanoid(), value: "", isRight: false },
  { id: nanoid(), value: "", isRight: false },
];

const clearFormValues = {
  question: "",
};

const QuestionForm = ({ isNew, question }) => {
  const [questionType, setQuestionType] = useState(typeOptions[0]);
  const [textAnswers, setTextAnswers] = useState(initialAnswers);
  const [textAnswerElements, setTextAnswerElements] = useState([]);
  const [removal, setRemoval] = useState(false);
  const [removedTextAnswer, setRemovedTextAnswer] = useState(null);
  const [numberAnswer, setNumberAnswer] = useState("");

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

  return (
    <Formik
      initialValues={!isNew ? question : clearFormValues}
      validationSchema={validation}
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
            options={typeOptions}
            isSearchable={false}
            blurInputOnSelect={false}
            onChange={handleQuestionTypeChange}
          />
        </div>

        {questionType.value === "number" ? (
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

        <div className={s.buttonsWrapper}>
          {questionType.value !== "number" && (
            <button
              className={s.addAnswerBtn}
              type="button"
              onClick={handleAddNewTextAnswer}
            ></button>
          )}

          <button className={s.mainBtn} type="button">
            Cancel
          </button>
          <button className={s.mainBtn} type="button">
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
