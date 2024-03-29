import PropTypes from "prop-types";
import cn from "classnames";

import Popup from "./Popup.jsx";

import s from "./styles/RespPopup.module.scss";

const RespPopup = ({ isSuccess, message, visibility, closePopup }) => {
  const heading = isSuccess ? "Awesome!" : "Oops! Something went wrong...";

  const rootClass = cn(s.root, {
    [s.root_success]: isSuccess,
    [s.root_error]: !isSuccess,
  });
  const headignClass = cn(s.heading, {
    [s.heading_success]: isSuccess,
    [s.heading_error]: !isSuccess,
  });

  return (
    <Popup visibility={visibility} closePopup={closePopup}>
      <div className={rootClass}>
        <h3 className={headignClass}>{heading}</h3>
        <p className={s.message}>{message}</p>
      </div>
    </Popup>
  );
};

RespPopup.propTypes = {
  isSuccess: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  visibility: PropTypes.bool.isRequired,
  closePopup: PropTypes.func.isRequired,
};

export default RespPopup;
