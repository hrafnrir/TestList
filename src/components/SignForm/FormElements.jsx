import { useState, useEffect } from "react";
import { useField } from "formik";

import s from "./styles/FormElements.module.scss";

export const TextInput = (props) => {
  const [field, meta] = useField(props);
  return (
    <div className={s.wrapper}>
      <input className={s.input} {...field} {...props} />
      {meta.touched && meta.error && (
        <span className={s.warn}>{meta.error}</span>
      )}
    </div>
  );
};

export const PasswordInput = (props) => {
  const [field, meta] = useField(props);
  const [inputType, setInputType] = useState("password");

  useEffect(() => {
    !meta.value && inputType === "text" && setInputType("password");
  }, [meta.value, inputType]);

  const handleClickOnViewBtn = () => {
    if (meta.value) {
      inputType === "password"
        ? setInputType("text")
        : setInputType("password");
    }
  };

  return (
    <div className={s.wrapper}>
      <input className={s.input} type={inputType} {...field} {...props} />
      <button
        className={s.viewBtn}
        type="button"
        onClick={handleClickOnViewBtn}
      ></button>
      {meta.touched && meta.error && (
        <span className={s.warn}>{meta.error}</span>
      )}
    </div>
  );
};
