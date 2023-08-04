import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import cn from "classnames";

import {
  selectLoading,
  selectSessionData,
} from "../model/selectors/sessionSelectors.js";

import SignForm from "../components/SignForm/SignForm.jsx";
import Loading from "../components/Loading/Loading.jsx";
import ResponsePopup from "../components/Popup/ResponsePopup.jsx";

import s from "./styles/Sign.module.scss";

export const Sign = ({ type }) => {
  const sessionData = useSelector(selectSessionData);
  const loading = useSelector(selectLoading);

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
        <ResponsePopup path='/signin' />
    </>
  );
};

Sign.propTypes = {
  type: PropTypes.string.isRequired,
};
