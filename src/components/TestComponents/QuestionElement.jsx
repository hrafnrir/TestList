import PropTypes from "prop-types";
import cn from "classnames";

import s from "./styles/QuestionElement.module.scss";

const QuestionElement = ({ title, onFormOpen, onRemove }) => {
  return (
    <div className={s.question}>
      <h3 className={s.questionHeading}>{title}</h3>
      <button
        className={cn(s.questionBtn, s.questionBtn_edit)}
        type="button"
        onClick={onFormOpen}
      ></button>
      <button
        className={cn(s.questionBtn, s.questionBtn_delete)}
        type="button"
        onClick={onRemove}
      ></button>
    </div>
  );
};

export default QuestionElement;

QuestionElement.propTypes = {
  title: PropTypes.string.isRequired,
  onFormOpen: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};
