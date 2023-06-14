import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";

import sagaActions from "./actions.js";
import {
  addLoading,
  addError,
  addSuccess,
  addSession,
} from "../slices/appSlice.js";

const instance = axios.create({
  baseURL: "https://interns-test-fe.snp.agency/api/v1/",
  headers: { "scope-key": "eVW&g97QJt%TVb$A", Accept: "application/json" },
});

function* fetchRegistration({ payload }) {
  yield put(addLoading(true));
  try {
    const resp = yield call(async () => await instance.post("signup", payload));
    yield put(addSuccess(`Success to sign up, ${resp.data.username}!`));
    yield put(addLoading(false));
  } catch (e) {
    yield put(addError(`Failed to sign up. ${e.message}.`));
    yield put(addLoading(false));
  }
}

function* fetchAuthorization({ payload }) {
  yield put(addLoading(true));
  try {
    const resp = yield call(
      async () =>
        await instance.post("signin", payload).then((resp) => resp.data)
    );
    yield put(addSession({ username: resp.username, is_admin: resp.is_admin }));
    yield put(addLoading(false));
  } catch (e) {
    yield put(addError(`Failed to login. ${e.message}.`));
    yield put(addLoading(false));
  }
}

export function* rootSaga() {
  yield all([yield takeLatest(sagaActions.SIGNUP, fetchRegistration)]);
  yield all([yield takeLatest(sagaActions.SIGNIN, fetchAuthorization)]);
}
