import { call, put } from "redux-saga/effects";

import { instance } from "./instance.js";
import { addLoading, addError } from "../slices/sessionSlice.js";
import { getTests, addNewTest } from "../slices/testSlice.js";

export function* fetchTests() {
  yield put(addLoading(true));

  try {
    const resp = yield call(instance, "tests");
    yield put(getTests(resp.data));
    yield put(addLoading(false));
  } catch (e) {
    yield put(
      addError(
        `Failed to load tests: ${
          e.response.data.error || e.message.toLowerCase()
        }.`
      )
    );
    yield put(addLoading(false));
  }
}

export function* fetchNewTest({ payload }) {
  yield put(addLoading(true));

  try {
    const resp = yield call(instance.post, "tests", payload);
    yield put(addNewTest(resp.data));
    yield put(addLoading(false));
  } catch (e) {
    yield put(
      addError(
        `Failed to add new test: ${
          e.response.data.error || e.message.toLowerCase()
        }.`
      )
    );
    yield put(addLoading(false));
  }
}
