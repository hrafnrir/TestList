import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import cn from "classnames";

import s from "./styles/Error.module.scss";

const Error = ({ visibility, message, closePopup }) => {
  const popupBody = useRef(null);

  useEffect(() => {
    const handleKeyUp = (e) => {
      e.key === "Escape" && closePopup();
    };

    const handleClick = (e) => {
      !popupBody.current.contains(e.target) && closePopup();
    };

    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const rootClass = cn(s.root, { [s.root_visible]: visibility });
  const mainWrapperClass = cn(s.mainWrapper, {
    [s.mainWrapper_visible]: visibility,
  });

  return createPortal(
    <div className={rootClass}>
      <div className={mainWrapperClass} ref={popupBody}>
        <div className={s.mainBlock}>
          <h3 className={s.heading}>Oops! Something went wrong...</h3>
          <p className={s.message}>{message}</p>
          <button className={s.closeBtn} onClick={closePopup}></button>
        </div>
      </div>
    </div>,
    document.getElementById("root")
  );
};

Error.propTypes = {
  visibility: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  closePopup: PropTypes.func.isRequired,
};

export default Error;
