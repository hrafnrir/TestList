import { call, put } from "redux-saga/effects";
import { redirect } from "react-router-dom";

import { instance } from "./instance.js";
import {
  addLoading,
  addError,
  addSuccess,
  addSession,
  endSession,
} from "../slices/sessionSlice.js";

export function* fetchSignUp({ payload }) {
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

export function* fetchSignIn({ payload }) {
  yield put(addLoading(true));

  try {
    const resp = yield call(instance.post, "signin", payload);
    const data = {
      username: resp.data.username,
      is_admin: resp.data.is_admin,
    };

    yield put(addSession(data));
    yield localStorage.setItem("session", JSON.stringify(data));
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

export function* fetchLogout() {
  try {
    yield call(instance.delete, "logout");
    yield put(endSession());
    yield localStorage.removeItem("session");
  } catch (e) {
    yield put(addError(`Failed to logout: ${e.message.toLowerCase()}.`));
  }
}
