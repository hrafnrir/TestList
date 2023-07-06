import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { selectSessionData } from "../model/selectors/sessionSelectors.js";
import { GET_TESTS } from "../model/slices/testSlice.js";

export const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GET_TESTS());
  }, []);

  const sessionData = useSelector(selectSessionData);

  return !sessionData && <Navigate to="/signin" />;
};
