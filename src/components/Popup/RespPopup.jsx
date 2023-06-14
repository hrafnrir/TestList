import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import cn from "classnames";

import s from "./styles/RespPopup.module.scss";

const RespPopup = ({ visibility, isSuccess, message, closePopup }) => {
  const popupBody = useRef(null);

  const heading = isSuccess ? "Awesome!" : "Oops! Something went wrong...";

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
  const mainBlockClass = cn(s.mainBlock, {
    [s.mainBlock_success]: isSuccess,
    [s.mainBlock_error]: !isSuccess,
  });
  const headignClass = cn(s.heading, {
    [s.heading_success]: isSuccess,
    [s.heading_error]: !isSuccess,
  });

  return createPortal(
    <div className={rootClass}>
      <div className={mainWrapperClass} ref={popupBody}>
        <div className={mainBlockClass}>
          <h3 className={headignClass}>{heading}</h3>
          <p className={s.message}>{message}</p>
          <button className={s.closeBtn} onClick={closePopup}></button>
        </div>
      </div>
    </div>,
    document.getElementById("root")
  );
};

RespPopup.propTypes = {
  visibility: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  closePopup: PropTypes.func.isRequired,
};

export default RespPopup;
