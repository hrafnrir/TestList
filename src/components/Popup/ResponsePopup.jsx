import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import cn from "classnames";

import { selectError, selectSuccess } from "../../model/selectors/sessionSelectors.js";
import { addError, addSuccess } from "../../model/slices/sessionSlice.js";

import Popup from "./Popup.jsx";

import s from "./styles/ResponsePopup.module.scss";

const ResponsePopup = ({ path }) => {
  const [isSuccess, setSuccess] = useState(true);
  const [isPopupOpen, setPopup] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const success = useSelector(selectSuccess);
  const error = useSelector(selectError);

  const heading = isSuccess ? "Awesome!" : "Oops! Something went wrong...";

  useEffect(() => {
    error ? setSuccess(false) : setSuccess(true);
  }, [error]);

  useEffect(() => {
    (success || error) && setPopup(true);
  }, [success, error]);

  const handleClosePopup = () => {
    setPopup(false);

    if (isSuccess) {
      dispatch(addSuccess(null));
      navigate(path);
    } else {
      dispatch(addError(null));
    }
  };

  const rootClass = cn(s.root, {
    [s.root_success]: isSuccess,
    [s.root_error]: !isSuccess,
  });
  const headingClass = cn(s.heading, {
    [s.heading_success]: isSuccess,
    [s.heading_error]: !isSuccess,
  });

  return (
    isPopupOpen &&
    (<Popup closePopup={handleClosePopup}>
      <div className={rootClass}>
        <h3 className={headingClass}>{heading}</h3>
        <p className={s.message}>{error || success}</p>
      </div>
    </Popup>)
  );
};

ResponsePopup.propTypes = {
  path: PropTypes.string.isRequired,
};

export default ResponsePopup;
