import { Outlet } from "react-router-dom";

import Header from "./Header/Header.jsx";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
