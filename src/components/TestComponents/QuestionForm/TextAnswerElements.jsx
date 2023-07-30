import { useEffect, useState } from "react";
import { useField } from "formik";
import { nanoid } from "@reduxjs/toolkit";
import PropTypes from "prop-types";

import { TextAnswer } from "./FormElements.jsx";

import s from "./styles/TextAnswerElements.module.scss";

const TextAnswerElements = ({ children, ...props }) => {
  const [, { value }, { setValue }] = useField(props);

  const [answerElements, setAnswerElements] = useState([]);
  const [removal, setRemoval] = useState(false);

  useEffect(() => {
    setAnswerElements(
      value.map(({ id, text, is_right }, index) => {
        return (
          <TextAnswer
            key={id}
            id={id}
            name={`text_answer_${id}`}
            label={`Answer #${index + 1}`}
            initialValue={text}
            is_right={is_right}
            onAnswerChange={handleAnswerChange}
            onCheckboxChange={handleAnswerCheck(id, !is_right)}
            removal={removal}
            onRemove={handleAnswerRemove(id)}
          />
        );
      })
    );
  }, [value, removal]);

  useEffect(() => {
    if (value.length < 3 && removal) setRemoval(false);
    if (value.length > 2 && !removal) setRemoval(true);
  }, [value.length]);

  const handleTextAnswerCreate = () => {
    setValue([...value, { id: nanoid(), text: "", is_right: false }]);
  };

  const handleAnswerChange = (id, updatedText) => {
    setValue(
      value.map((item) => {
        if (item.id === id) item.text = updatedText;
        return item;
      })
    );
  };

  const handleAnswerCheck = (id, updatedIsRight) => () => {
    setValue(
      value.map((item) => {
        if (item.id === id) item.is_right = updatedIsRight;
        return item;
      })
    );
  };

  const handleAnswerRemove = (removedAnswerId) => () => {
    setValue(value.filter(({ id }) => id !== removedAnswerId));
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
