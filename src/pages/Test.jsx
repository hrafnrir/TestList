import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import cn from "classnames";

import { selectSessionData } from "../model/selectors/sessionSelectors.js";

import QuestionForm from "../components/QuestionForm/QuestionForm.jsx";
import QuestionElement from "../components/QuestionElement/QuestionElement.jsx";
import ConfirmationPopup from "../components/Popup/ConfirmationPopup.jsx";

import s from "./styles/Test.module.scss";

const confirmationTypes = {
  SUBMIT_TEST: "submit_test",
  REMOVE_QUESTION: "remove_question",
};

export const Test = ({ type }) => {
  const [isPopupOpen, setPopup] = useState(false);
  const [isFormOpen, setForm] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionElements, setQuestionElements] = useState([]);

  const isCreate = type === "create";

  useEffect(() => {
    questions &&
      setQuestionElements(
        questions.map((item, index) => {
          const name = `update_${item.id}`;

          return (
            <div key={index}>
              <QuestionElement
                title={item.title}
                onFormOpen={handleFormOpen(name)}
                onRemove={handlePopupOpen({
                  type: confirmationTypes.REMOVE_QUESTION,
                  message: `Do you want to remove question "${item.title}"?`,
                  props: { id: item.id, name },
                })}
              />

              {isFormOpen === name && (
                <QuestionForm
                  isNew={false}
                  question={item}
                  onSubmit={handleQuestionUpdate}
                  onCancel={handleFormOpen(null)}
                />
              )}
            </div>
          );
        })
      );
  }, [questions, isFormOpen]);

  const isAdminSession = useSelector(selectSessionData)?.is_admin;

  const title = useRef(null);

  const handleFormOpen = (form) => () => {
    setForm(form);
  };

  const handleQuestionCreate = (values) => {
    setQuestions((prevState) => [...prevState, { ...values }]);
  };

  const handleQuestionUpdate = (values) => {
    setQuestions((prevState) => [
      ...prevState.map((item) => (item.id === values.id ? values : item)),
    ]);
  };

  const handleQuestionRemove = ({ id, name }) => {
    setQuestions((prevState) => [
      ...prevState.filter((item) => item.id !== id),
    ]);

    isFormOpen === name && setForm(null);
  };

  const handleSubmit = () => {};

  const handleConfirm =
    ({ type, isConfirm, props }) =>
    () => {
      if (isConfirm) {
        type === confirmationTypes.SUBMIT_TEST && handleSubmit();
        type === confirmationTypes.REMOVE_QUESTION &&
          handleQuestionRemove(props);
      }

      setPopup(false);
    };

  const handlePopupOpen = (props) => () => {
    setPopup(props);
  };

  const handlePopupClose = () => {
    setPopup(false);
  };

  return !isAdminSession ? (
    <Navigate to="/" />
  ) : (
    <>
      <main className={s.root}>
        <h1 className={s.pageHeading}>Create test</h1>
        <div className={s.contentWrapper}>
          <div className={s.titleBlock}>
            <h2 className={s.blockHeading}>Title</h2>
            <input
              className={s.input}
              type="text"
              placeholder="Enter test title..."
              ref={title}
            />
          </div>
          <div className={s.questionsBlock}>
            <h2 className={s.blockHeading}>Questions</h2>
            {questionElements}

            {isFormOpen === "create" ? (
              <QuestionForm
                isNew={true}
                onSubmit={handleQuestionCreate}
                onCancel={handleFormOpen(null)}
              />
            ) : (
              <button
                className={s.addQuestionBtn}
                type="button"
                onClick={handleFormOpen("create")}
              ></button>
            )}
          </div>
        </div>
        <div className={s.btnWrapper}>
          {!isCreate && (
            <button className={cn(s.button, s.button_delete)}>Delete</button>
          )}

          <button
            className={cn(s.button, s.button_save)}
            onClick={handlePopupOpen({
              type: confirmationTypes.SUBMIT_TEST,
              message: "Do you want to submit this test?",
            })}
          >
            Save
          </button>
        </div>
      </main>

      {isPopupOpen && (
        <ConfirmationPopup
          type={isPopupOpen.type}
          message={isPopupOpen.message}
          props={isPopupOpen.props}
          closePopup={handlePopupClose}
          getConfirmation={handleConfirm}
        />
      )}
    </>
  );
};

Test.propTypes = {
  type: PropTypes.string.isRequired,
};
