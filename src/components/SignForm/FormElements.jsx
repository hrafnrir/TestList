import { useField } from "formik";

import s from "./styles/FormElements.module.scss";

export const Input = (props) => {
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
