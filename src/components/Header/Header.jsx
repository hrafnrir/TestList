import { Link } from "react-router-dom";

import s from "./styles/Header.module.scss";

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.headerContent}>
        <Link to="/" className={s.logo}>
          TestApp
        </Link>
        <Link to="/tests" className={s.button}>
          Add test
        </Link>
        <button className={s.button}>Log out</button>
      </div>
    </header>
  );
};

export default Header;
