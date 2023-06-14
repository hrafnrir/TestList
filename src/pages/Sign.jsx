import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import cn from "classnames";

import { selectSuccess, selectError } from "../model/selectors/appSelectors.js";
import { addSuccess, addError } from "../model/slices/appSlice.js";

import SignForm from "../components/SignForm/SignForm.jsx";
import RespPopup from "../components/Popup/RespPopup.jsx";

import s from "./styles/Sign.module.scss";

export const Sign = ({ type }) => {
  const [isPopupOpen, setPopup] = useState({ success: false, error: false });

  const dispatch = useDispatch();

  const success = useSelector(selectSuccess);
  const error = useSelector(selectError);

  const isSignUp = type === "signup";

  const { heading, question, link, href } = isSignUp
    ? {
        heading: "Create an account",
        question: "Already have an account?",
        link: "Login in",
        href: "/signin",
      }
    : {
        heading: "Welcome back!",
        question: `Don't have an account?`,
        link: "Register",
        href: "/signup",
      };

  useEffect(() => {
    success && setPopup((prevState) => ({ ...prevState, success: true }));
  }, [success]);

  useEffect(() => {
    error && setPopup((prevState) => ({ ...prevState, error: true }));
  }, [error]);

  const handleClosePopup = (type) => {
    setPopup((prevState) => ({ ...prevState, [type]: false }));
    type === "success" ? dispatch(addSuccess(null)) : dispatch(addError(null));
  };

  const rootClass = cn(s.root, {
    [s.root_signup]: isSignUp,
    [s.root_signin]: !isSignUp,
  });

  return (
    <>
      <div className={rootClass}>
        <header className={s.header}>
          <div className={s.headerContent}>
            <span className={s.logo}>TestApp</span>
          </div>
        </header>
        <div className={s.wrapper}>
          <main className={s.formBlock}>
            <h1 className={s.heading}>{heading}</h1>

            {isSignUp && (
              <p className={s.description}>
                Enter the information you entered while registering.
              </p>
            )}

            <SignForm key={type} isSignUp={isSignUp} />
            <p className={s.question}>
              {question}
              <Link to={href} className={s.link}>
                {`${link}.`}
              </Link>
            </p>
          </main>
        </div>
      </div>

      {isPopupOpen.success && (
        <RespPopup
          visibility={isPopupOpen.success}
          isSuccess={true}
          message={success}
          closePopup={() => handleClosePopup("success")}
        />
      )}

      {isPopupOpen.error && (
        <RespPopup
          visibility={isPopupOpen.error}
          isSuccess={false}
          message={error}
          closePopup={() => handleClosePopup("error")}
        />
      )}
    </>
  );
};

Sign.propTypes = {
  type: PropTypes.string.isRequired,
};
