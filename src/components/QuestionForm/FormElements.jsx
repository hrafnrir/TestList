import PropTypes from "prop-types";
import cn from "classnames";

import s from "./styles/QuestionForm.module.scss";

export const TextInput = ({ id, label, ...props }) => {
  return (
    <div className={s.wrapper}>
      <label className={s.inputLabel} htmlFor={id}>
        {label}:
      </label>
      <input className={s.input} type="text" id={id} {...props} />
    </div>
  );
};

export const TextAnswer = ({
  commonId,
  id,
  name,
  label,
  initialValue,
  isRight,
  onAnswerChange,
  onCheckboxChange,
  removal,
  onRemove,
}) => {
  const handleAnswerChange = (e) => {
    onAnswerChange(commonId, e.target.value);
  };

  return (
    <div className={s.wrapper}>
      <label className={s.inputLabel} htmlFor={id}>
        {label}:
      </label>
      <input
        className={s.input}
        type="text"
        id={id}
        name={name}
        defaultValue={initialValue}
        placeholder="Enter the answer..."
        onChange={handleAnswerChange}
      />
      <label className={s.checkboxLabel}>
        Is correct:{" "}
        <input
          className={s.checkbox}
          type="checkbox"
          name={`${name}_checkbox`}
          defaultChecked={isRight}
          onChange={onCheckboxChange(commonId, !isRight)}
        />
      </label>
      {removal && (
        <button
          className={s.removeBtn}
          type="button"
          onClick={onRemove(commonId)}
        ></button>
      )}
    </div>
  );
};

export const NumberAnswer = ({ label, ...props }) => {
  return (
    <div className={s.wrapper}>
      <label className={s.inputLabel} htmlFor="answer">
        {label}:
      </label>
      <div className={s.numberInputWrapper}>
        <button
          className={cn(s.numberButton, s.numberButton_minus)}
          type="button"
        />
        <input className={s.numberInput} type="number" {...props} />
        <button
          className={cn(s.numberButton, s.numberButton_plus)}
          type="button"
        />
      </div>
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

TextAnswer.propTypes = {
  commonId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  initialValue: PropTypes.string.isRequired,
  isRight: PropTypes.bool.isRequired,
  onAnswerChange: PropTypes.func.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  removal: PropTypes.bool.isRequired,
  onRemove: PropTypes.func.isRequired,
};

NumberAnswer.propTypes = {
  label: PropTypes.string.isRequired,
};
