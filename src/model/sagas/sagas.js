/*eslint-env node*/

import { call, put, takeLatest, all } from "redux-saga/effects";
import { redirect } from "react-router-dom";
import axios from "axios";

import {
  signUp,
  signIn,
  addLoading,
  addError,
  addSuccess,
  addSession,
} from "../slices/sessionSlice.js";

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { "scope-key": process.env.SCOPE_KEY, Accept: "application/json" },
});

function* fetchSignUp({ payload }) {
  yield put(addLoading(true));

  try {
    const resp = yield call(instance.post, "signup", payload);

    yield put(addSuccess(`Success to sign up, ${resp.data.username}!`));
    yield put(addLoading(false));
  } catch (e) {
    yield put(addError(`Failed to sign up: ${e.message.toLowerCase()}.`));
    yield put(addLoading(false));
  }
}

function* fetchSignIn({ payload }) {
  yield put(addLoading(true));

  try {
    const resp = yield call(
      async () =>
        await instance.post("signin", payload).then((resp) => ({
          username: resp.data.username,
          is_admin: resp.data.is_admin,
        }))
    );

    yield put(addSession(resp));
    yield localStorage.setItem("session", JSON.stringify(resp));
    yield put(addLoading(false));
    yield redirect("/");
  } catch (e) {
    yield put(
      addError(
        `Failed to login: ${e.response.data.error || e.message.toLowerCase()}.`
      )
    );
    yield put(addLoading(false));
  }
}

export function* rootSaga() {
  yield all([yield takeLatest(signUp, fetchSignUp)]);
  yield all([yield takeLatest(signIn, fetchSignIn)]);
}
