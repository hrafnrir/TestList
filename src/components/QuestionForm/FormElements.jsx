import { useField } from "formik";
import PropTypes from "prop-types";
import cn from "classnames";

import s from "./styles/FormElements.module.scss";

const numberRegExp = /^(0|-?([1-9]\d*)?)/g;

export const TextInput = ({ id, label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className={s.wrapper}>
        <label className={s.inputLabel} htmlFor={id}>
          {label}:
        </label>
        <input className={s.input} id={id} {...field} {...props} />
      </div>

      {meta.touched && meta.error && (
        <span className={s.warn}>{meta.error}</span>
      )}
    </>
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
        value={initialValue}
        placeholder="Enter the answer..."
        onChange={handleAnswerChange}
      />
      <label className={s.checkboxLabel}>
        Is correct:{" "}
        <input
          className={s.checkbox}
          type="checkbox"
          name={`${name}_checkbox`}
          checked={isRight}
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
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  const handleCount = (term) => () => {
    setValue(+meta.value + term);
  };

  const handleNumberChange = (e) => {
    const { value } = e.target;

    if (value === "") {
      setValue("");
      return;
    }

    const [validValue] = value.match(numberRegExp);
    validValue && setValue(validValue);
  };

  const handleBlur = () => {
    meta.value === "-" && setValue(-1);
  };

  return (
    <div className={s.wrapper}>
      <label className={s.inputLabel} htmlFor={field.name}>
        {label}:
      </label>
      <div className={s.numberInputWrapper}>
        <button
          className={cn(s.numberButton, s.numberButton_minus)}
          type="button"
          onClick={handleCount(-1)}
        />
        <input
          className={s.numberInput}
          type="text"
          id={field.name}
          value={meta.initialValue}
          {...field}
          {...props}
          onChange={handleNumberChange}
          onBlur={handleBlur}
        />
        <button
          className={cn(s.numberButton, s.numberButton_plus)}
          type="button"
          onClick={handleCount(1)}
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
