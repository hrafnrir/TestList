import PropTypes from "prop-types";
import cn from "classnames";

import Popup from "./Popup.jsx";

import s from "./styles/ConfirmationPopup.module.scss";

const ConfirmationPopup = ({
  type,
  message,
  props,
  closePopup,
  getConfirmation,
}) => {
  return (
    <Popup closePopup={closePopup}>
      <div className={s.root}>
        <h3 className={s.heading}>Are you sure?</h3>
        <p className={s.message}>{message}</p>
        <div className={s.btnWrapper}>
          <button
            className={cn(s.button, s.button_no)}
            onClick={getConfirmation({ isConfirm: false })}
          >
            No, thanks...
          </button>
          <button
            className={cn(s.button, s.button_yes)}
            onClick={getConfirmation({
              isConfirm: true,
              type,
              props,
            })}
          >
            Yes, I am!
          </button>
        </div>
      </div>
    </Popup>
  );
};

ConfirmationPopup.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  props: PropTypes.object,
  closePopup: PropTypes.func.isRequired,
  getConfirmation: PropTypes.func.isRequired,
};

export default ConfirmationPopup;
