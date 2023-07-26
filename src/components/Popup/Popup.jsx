import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import cn from "classnames";

import s from "./styles/Popup.module.scss";

const Popup = ({ closePopup, children }) => {
  const [visibility, setVisibility] = useState(false);

  const popupBody = useRef(null);

  useEffect(() => {
    setVisibility(true);

    return () => setVisibility(false);
  }, []);

  useEffect(() => {
    const handleKeyUp = (e) => {
      visibility && e.key === "Escape" && closePopup();
    };

    const handleClick = (e) => {
      visibility && !popupBody.current.contains(e.target) && closePopup();
    };

    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("click", handleClick);
    };
  }, [visibility]);

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
  closePopup: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

export default Popup;
