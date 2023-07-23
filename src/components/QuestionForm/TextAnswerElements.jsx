import { useEffect, useState } from "react";
import { useField } from "formik";
import { nanoid } from "@reduxjs/toolkit";
import PropTypes from "prop-types";

import { TextAnswer } from "./FormElements.jsx";

import s from "./styles/QuestionForm.module.scss";

const TextAnswerElements = ({ children, ...props }) => {
  const [, { value }, { setValue }] = useField(props);

  const [answerElements, setAnswerElements] = useState([]);
  const [removal, setRemoval] = useState(false);
  const [removedAnswer, setRemovedAnswer] = useState(null);

  useEffect(() => {
    setAnswerElements(
      value.map(({ id, value, isRight }, index) => {
        return (
          <TextAnswer
            key={id}
            id={id}
            name={`text_answer_${id}`}
            label={`Answer #${index + 1}`}
            initialValue={value}
            isRight={isRight}
            onAnswerChange={handleAnswerChange}
            onCheckboxChange={handleAnswerCheck}
            removal={removal}
            onRemove={handleAnswerRemove}
          />
        );
      })
    );
  }, [value, removal]);

  useEffect(() => {
    removedAnswer !== null &&
      setValue(value.filter(({ id }) => id !== removedAnswer));
  }, [removedAnswer]);

  useEffect(() => {
    if (value.length < 3 && removal) setRemoval(false);
    if (value.length > 2 && !removal) setRemoval(true);
  }, [value.length]);

  const handleTextAnswerCreate = () => {
    setValue([...value, { id: nanoid(), value: "", isRight: false }]);
  };

  const handleAnswerChange = (id, updatedValue) => {
    setValue(
      value.map((item) => {
        if (item.id === id) item.value = updatedValue;
        return item;
      })
    );
  };

  const handleAnswerCheck = (id, updatedIsRight) => () => {
    setValue(
      value.map((item) => {
        if (item.id === id) item.isRight = updatedIsRight;
        return item;
      })
    );
  };

  const handleAnswerRemove = (id) => () => {
    setRemovedAnswer(id);
  };

  return (
    <>
      {answerElements}
      {children}
      <button
        className={s.addAnswerBtn}
        type="button"
        onClick={handleTextAnswerCreate}
      ></button>
    </>
  );
};

export default TextAnswerElements;

TextAnswerElements.propTypes = {
  children: PropTypes.object,
};
