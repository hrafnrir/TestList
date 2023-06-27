import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { selectSessionData } from "../model/selectors/sessionSelectors.js";

export const Home = () => {
  const sessionData = useSelector(selectSessionData);

  return !sessionData && <Navigate to="/signin" />;
};
