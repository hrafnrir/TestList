import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import cn from "classnames";

import s from "./styles/Popup.module.scss";

const Popup = ({ visibility, closePopup, children }) => {
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
        {children}
        <button className={s.closeBtn} onClick={closePopup}></button>
      </div>
    </div>,
    document.getElementById("root")
  );
};

Popup.propTypes = {
  visibility: PropTypes.bool.isRequired,
  closePopup: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

export default Popup;
