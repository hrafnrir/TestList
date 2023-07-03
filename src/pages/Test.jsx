import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import cn from "classnames";

import { selectSessionData } from "../model/selectors/sessionSelectors.js";

import QuestionForm from "../components/QuestionForm/QuestionForm.jsx";

import s from "./styles/Test.module.scss";

export const Test = () => {
  const isAdminSession = useSelector(selectSessionData)?.is_admin;

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
          />
        </div>
        <div className={s.questionsBlock}>
          <h2 className={s.blockHeading}>Questions</h2>
          <div className={s.questionsWrapper}>
            <div className={s.question}>
              <h3 className={s.questionHeading}>
                Choose one of the suggested answers
              </h3>
              <button
                className={cn(s.questionBtn, s.questionBtn_edit)}
                type="button"
              ></button>
              <button
                className={cn(s.questionBtn, s.questionBtn_delete)}
                type="button"
              ></button>
            </div>
            <button className={s.addQuestionBtn} type="button"></button>
          </div>
          <QuestionForm />
        </div>
      </div>
      <div className={s.btnWrapper}>
        <button className={cn(s.button, s.button_delete)}>Delete</button>
        <button className={cn(s.button, s.button_save)}>Save</button>
      </div>
    </main>
  );
};
