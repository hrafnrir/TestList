import cn from "classnames";

import s from "./styles/QuestionElement.module.scss";

const QuestionElement = () => {
  return (
    <div className={s.question}>
      <h3 className={s.questionHeading}>Choose one of the suggested answers</h3>
      <button
        className={cn(s.questionBtn, s.questionBtn_edit)}
        type="button"
      ></button>
      <button
        className={cn(s.questionBtn, s.questionBtn_delete)}
        type="button"
      ></button>
    </div>
  );
};

export default QuestionElement;
