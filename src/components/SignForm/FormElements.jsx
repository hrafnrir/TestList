import { useState } from "react";
import { useField } from "formik";
import cn from "classnames";

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
  const [field, meta, helpers] = useField(props);

  const [viewBtnVisibility, setViewBtnVisibility] = useState(false);
  const [viewBtnFadeIn, setViewBtnFadeIn] = useState(false);
  const [inputType, setInputType] = useState("password");

  const handleInputChange = (e) => {
    const value = e.target.value;
    helpers.setValue(value);

    !viewBtnVisibility && value && setViewBtnVisibility(true);
    setViewBtnFadeIn(!!value);

    !value && inputType === "text" && setInputType("password");
  };

  const handleClickOnViewBtn = () => {
    inputType === "password" ? setInputType("text") : setInputType("password");
  };

  const viewBtnClass = cn(s.viewBtn, {
    [s.viewBtn_fadeIn]: viewBtnFadeIn,
    [s.viewBtn_fadeOut]: !viewBtnFadeIn,
  });

  return (
    <div className={s.wrapper}>
      <input
        className={s.input}
        type={inputType}
        {...field}
        onChange={handleInputChange}
        {...props}
      />

      {viewBtnVisibility && (
        <button
          className={viewBtnClass}
          type="button"
          onClick={handleClickOnViewBtn}
        ></button>
      )}

      {meta.touched && meta.error && (
        <span className={s.warn}>{meta.error}</span>
      )}
    </div>
  );
};
