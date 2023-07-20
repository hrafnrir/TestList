import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import cn from "classnames";

import { selectSessionData } from "../model/selectors/sessionSelectors.js";
import { ADD_NEW_TEST } from "../model/slices/testSlice.js";

import QuestionForm from "../components/QuestionForm/QuestionForm.jsx";
import QuestionElement from "../components/QuestionElement/QuestionElement.jsx";

import s from "./styles/Test.module.scss";

export const Test = () => {
  const [isFormOpen, setForm] = useState(false);

  const isAdminSession = useSelector(selectSessionData)?.is_admin;

  const dispatch = useDispatch();
  const title = useRef(null);

  const handleClickOnAddQuestionButton = () => {
    setForm(true);
  };

  const hadnleSubmit = () => {
    const value = title.current.value.trim();
    value && dispatch(ADD_NEW_TEST({ title: value }));
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
            <QuestionElement />
            {!isFormOpen && (
              <button
                className={s.addQuestionBtn}
                type="button"
                onClick={handleClickOnAddQuestionButton}
              ></button>
            )}
          </div>
          {isFormOpen && <QuestionForm isNew={true} />}
        </div>
      </div>
      <div className={s.btnWrapper}>
        <button className={cn(s.button, s.button_delete)}>Delete</button>
        <button className={cn(s.button, s.button_save)} onClick={hadnleSubmit}>
          Save
        </button>
      </div>
    </main>
  );
};
