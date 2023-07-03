import cn from "classnames";

import s from "./styles/QuestionForm.module.scss";

const QuestionForm = () => {
  return (
    <form className={s.root}>
      <div className={s.wrapper}>
        <label className={s.inputLabel} htmlFor="question">
          Question:
        </label>
        <input
          className={s.input}
          type="text"
          name="question"
          id="question"
          placeholder="Enter your question..."
        />
      </div>
      <div className={s.wrapper}>
        <label className={s.inputLabel} htmlFor="answer1">
          Answer #1:
        </label>
        <input
          className={s.input}
          type="text"
          name="answer1"
          id="answer1"
          placeholder="Enter the answer..."
        />
        <label className={s.checkboxLabel}>
          Is correct:{" "}
          <input
            className={s.checkbox}
            type="checkbox"
            name="answer1_checkbox"
          />
        </label>
        <button className={s.deleteBtn} type="button"></button>
      </div>
      <div className={s.wrapper}>
        <label className={s.inputLabel} htmlFor="answer2">
          Answer #2:
        </label>
        <input
          className={s.input}
          type="text"
          name="answer2"
          id="answer2"
          placeholder="Enter the answer..."
        />
        <label className={s.checkboxLabel}>
          Is correct:{" "}
          <input
            className={s.checkbox}
            type="checkbox"
            name="answer2_checkbox"
          />
        </label>
        <button className={s.deleteBtn} type="button"></button>
      </div>
      <div className={s.wrapper}>
        <label className={s.inputLabel} htmlFor="answer">
          Answer:
        </label>
        <div className={s.numberInputWrapper}>
          <button
            className={cn(s.numberButton, s.numberButton_minus)}
            type="button"
          />
          <input
            className={s.numberInput}
            type="number"
            name="answer"
            id="answer"
            placeholder="0"
          />
          <button
            className={cn(s.numberButton, s.numberButton_plus)}
            type="button"
          />
        </div>
      </div>
      <div className={s.buttonsWrapper}>
        <button className={s.addAnswerBtn} type="button"></button>
        <button className={s.mainBtn} type="button">
          Cancel
        </button>
        <button className={s.mainBtn} type="button">
          Save
        </button>
      </div>
    </form>
  );
};

export default QuestionForm;
