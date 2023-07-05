import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectSessionData } from "../../model/selectors/sessionSelectors.js";
import { LOGOUT } from "../../model/slices/sessionSlice.js";

import s from "./styles/Header.module.scss";

const Header = () => {
  const dispatch = useDispatch();

  const isAdminSession = useSelector(selectSessionData)?.is_admin;

  const handleLogout = () => {
    dispatch(LOGOUT());
  };

  return (
    <header className={s.header}>
      <div className={s.headerContent}>
        <Link to="/" className={s.logo}>
          TestApp
        </Link>

        {isAdminSession && (
          <Link to="/tests" className={s.button}>
            Add test
          </Link>
        )}

        <button className={s.button} onClick={handleLogout}>
          Log out
        </button>
      </div>
    </header>
  );
};

export default Header;
