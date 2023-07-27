import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import cn from "classnames";

import { selectSessionData } from "../model/selectors/sessionSelectors.js";
import {
  confirmationPopupTypes,
  validationErrorTypes,
} from "../components/TestComponents/constants.js";
import { getValidation } from "../components/TestComponents/testValidation.js";
import { ADD_NEW_TEST } from "../model/slices/testSlice.js";

import QuestionForm from "../components/TestComponents/QuestionForm/QuestionForm.jsx";
import QuestionElement from "../components/TestComponents/QuestionElement.jsx";
import ConfirmationPopup from "../components/Popup/ConfirmationPopup.jsx";

import s from "./styles/Test.module.scss";

export const Test = ({ type }) => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionElements, setQuestionElements] = useState([]);
  const [validationError, setValidationError] = useState(null);
  const [isFormOpen, setForm] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopup] = useState(false);

  const dispatch = useDispatch();

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
                  type: confirmationPopupTypes.REMOVE_QUESTION,
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

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    validationError?.[validationErrorTypes.TITLE] &&
      setValidationError((prevState) => ({
        ...prevState,
        [validationErrorTypes.TITLE]: null,
      }));
  };

  const handleFormOpen = (form) => () => {
    setForm(form);
  };

  const handleQuestionCreate = (values) => {
    setQuestions((prevState) => [...prevState, { ...values }]);
    validationError?.[validationErrorTypes.QUESTION] &&
      setValidationError((prevState) => ({
        ...prevState,
        [validationErrorTypes.QUESTION]: null,
      }));
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

  const handleClickOnSaveButton = () => {
    getValidation({ title, questions, setError: setValidationError }) &&
      setConfirmPopup({
        type: confirmationPopupTypes.SUBMIT_TEST,
        message: "Do you want to submit this test?",
      });
  };

  const handleSubmit = () => {
    dispatch(ADD_NEW_TEST({ title, questions }));
  };

  const handleConfirm =
    ({ type, isConfirm, props }) =>
    () => {
      if (isConfirm) {
        type === confirmationPopupTypes.SUBMIT_TEST && handleSubmit();
        type === confirmationPopupTypes.REMOVE_QUESTION &&
          handleQuestionRemove(props);
      }

      setConfirmPopup(false);
    };

  const handlePopupOpen = (props) => () => {
    setConfirmPopup(props);
  };

  const handlePopupClose = () => {
    setConfirmPopup(false);
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
              value={title}
              placeholder="Enter test title..."
              onChange={handleTitleChange}
            />

            {validationError?.[validationErrorTypes.TITLE] && (
              <div className={cn(s.warn, s.warn_title)}>
                {validationError[validationErrorTypes.TITLE]}
              </div>
            )}
          </div>
          <div className={s.questionsBlock}>
            <h2 className={s.blockHeading}>Questions</h2>
            {questionElements}

            {isFormOpen === "create" && (
              <QuestionForm
                isNew={true}
                onSubmit={handleQuestionCreate}
                onCancel={handleFormOpen(null)}
              />
            )}

            {validationError?.[validationErrorTypes.QUESTION] && (
              <div className={s.warn}>
                {validationError[validationErrorTypes.QUESTION]}
              </div>
            )}

            {isFormOpen !== "create" && (
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
            onClick={handleClickOnSaveButton}
          >
            Save
          </button>
        </div>
      </main>

      {isConfirmPopupOpen && (
        <ConfirmationPopup
          type={isConfirmPopupOpen.type}
          message={isConfirmPopupOpen.message}
          props={isConfirmPopupOpen.props}
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
