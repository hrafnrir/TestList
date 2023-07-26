import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import cn from "classnames";

import {
  selectLoading,
  selectSuccess,
  selectError,
  selectSessionData,
} from "../model/selectors/sessionSelectors.js";
import { addSuccess, addError } from "../model/slices/sessionSlice.js";

import SignForm from "../components/SignForm/SignForm.jsx";
import Loading from "../components/Loading/Loading.jsx";
import ResponsePopup from "../components/Popup/ResponsePopup.jsx";

import s from "./styles/Sign.module.scss";

export const Sign = ({ type }) => {
  const [isSuccess, setSuccess] = useState(true);
  const [isPopupOpen, setPopup] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sessionData = useSelector(selectSessionData);
  const loading = useSelector(selectLoading);
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
    error ? setSuccess(false) : setSuccess(true);
  }, [error]);

  useEffect(() => {
    (success || error) && setPopup(true);
  }, [success, error]);

  const handleClosePopup = () => {
    setPopup(false);

    if (isSuccess) {
      dispatch(addSuccess(null));
      navigate("/signin");
    } else {
      dispatch(addError(null));
    }
  };

  const rootClass = cn(s.root, {
    [s.root_signup]: isSignUp,
    [s.root_signin]: !isSignUp,
  });
  const formHeaderClass = cn(s.formHeader, { [s.formHeader_loading]: loading });

  return sessionData ? (
    <Navigate to="/" />
  ) : (
    <>
      <div className={rootClass}>
        <header className={s.header}>
          <div className={s.headerContent}>
            <span className={s.logo}>TestApp</span>
          </div>
        </header>
        <div className={s.wrapper}>
          <main className={s.formBlock}>
            <div className={formHeaderClass}>
              <h1 className={s.heading}>{heading}</h1>

              {isSignUp && (
                <p className={s.description}>
                  Enter the information you entered while registering.
                </p>
              )}

              {loading && <Loading />}
            </div>
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

      {isPopupOpen && (
        <ResponsePopup
          isSuccess={isSuccess}
          message={success || error}
          closePopup={handleClosePopup}
        />
      )}
    </>
  );
};

Sign.propTypes = {
  type: PropTypes.string.isRequired,
};
