import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../../model/slices/sessionSlice.js";

import s from "./styles/Header.module.scss";

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={s.header}>
      <div className={s.headerContent}>
        <Link to="/" className={s.logo}>
          TestApp
        </Link>
        <Link to="/tests" className={s.button}>
          Add test
        </Link>
        <button className={s.button} onClick={handleLogout}>
          Log out
        </button>
      </div>
    </header>
  );
};

export default Header;
