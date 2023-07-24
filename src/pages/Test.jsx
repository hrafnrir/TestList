import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import cn from "classnames";

import { selectSessionData } from "../model/selectors/sessionSelectors.js";

import QuestionForm from "../components/QuestionForm/QuestionForm.jsx";
import QuestionElement from "../components/QuestionElement/QuestionElement.jsx";

import s from "./styles/Test.module.scss";

export const Test = () => {
  const [isFormOpen, setForm] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [questionElements, setQuestionElements] = useState([]);

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
                onRemove={handleQuestionRemove(item.id, name)}
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

  const handleQuestionRemove =
    (removedQuestionId, removedQuestionName) => () => {
      setQuestions((prevState) => [
        ...prevState.filter(({ id }) => id !== removedQuestionId),
      ]);

      isFormOpen === removedQuestionName && setForm(null);
    };

  return !isAdminSession ? (
    <Navigate to="/" />
  ) : (
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
          <div className={s.questionsWrapper}>
            {questionElements}

            {!isFormOpen && (
              <button
                className={s.addQuestionBtn}
                type="button"
                onClick={handleFormOpen("create")}
              ></button>
            )}
          </div>

          {isFormOpen === "create" && (
            <QuestionForm
              isNew={true}
              onSubmit={handleQuestionCreate}
              onCancel={handleFormOpen(null)}
            />
          )}
        </div>
      </div>
      <div className={s.btnWrapper}>
        <button className={cn(s.button, s.button_delete)}>Delete</button>
        <button className={cn(s.button, s.button_save)}>Save</button>
      </div>
    </main>
  );
};
