import { all, takeLatest } from "redux-saga/effects";

import { SIGN_UP, SIGN_IN, LOGOUT } from "../slices/sessionSlice.js";
import { GET_TESTS, ADD_NEW_TEST } from "../slices/testSlice.js";

import { fetchSignUp, fetchSignIn, fetchLogout } from "./sessionSagas.js";
import { fetchTests, fetchNewTest } from "./testSagas.js";

export function* rootSaga() {
  yield all([yield takeLatest(SIGN_UP, fetchSignUp)]);
  yield all([yield takeLatest(SIGN_IN, fetchSignIn)]);
  yield all([yield takeLatest(LOGOUT, fetchLogout)]);

  yield all([yield takeLatest(GET_TESTS, fetchTests)]);
  yield all([yield takeLatest(ADD_NEW_TEST, fetchNewTest)]);
}
