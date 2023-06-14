import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import cn from "classnames";

import { selectError } from "../model/selectors/appSelectors.js";
import { addError } from "../model/slices/appSlice.js";

import SignForm from "../components/SignForm/SignForm.jsx";
import Error from "../components/Popup/Error.jsx";

import s from "./styles/Sign.module.scss";

export const Sign = ({ type }) => {
  const [isErrorPopupOpen, setErrorPopup] = useState(false);

  const dispatch = useDispatch();

  const error = useSelector(selectError);
  const isSignUp = type === "signup";

  useEffect(() => {
    error && setErrorPopup(true);
  }, [error]);

  const handleCloseErrorPopup = () => {
    setErrorPopup(false);
    dispatch(addError(null));
  };

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

      {isErrorPopupOpen && (
        <Error
          visibility={isErrorPopupOpen}
          message={error}
          closePopup={handleCloseErrorPopup}
        />
      )}
    </>
  );
};

Sign.propTypes = {
  type: PropTypes.string.isRequired,
};
