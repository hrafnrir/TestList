import { call, put } from "redux-saga/effects";

import { instance } from "./instance.js";
import { addLoading, addError } from "../slices/sessionSlice.js";
import {
  getTests,
  addNewTest,
  updateTest,
  deleteTest,
} from "../slices/testSlice.js";

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

export function* fetchUpdateTest({ payload }) {
  yield put(addLoading(true));

  try {
    const prev = yield call(instance, `tests/${payload.id}`);

    if (JSON.stringify(payload) !== JSON.stringify(prev.data)) {
      const resp = yield call(instance.patch, `tests/${payload.id}`, payload);
      yield put(updateTest(resp.data));
    }

    yield put(addLoading(false));
  } catch (e) {
    yield put(
      addError(
        `Failed to update test: ${
          e.response.data.error || e.message.toLowerCase()
        }.`
      )
    );
    yield put(addLoading(false));
  }
}

export function* fetchDeleteTest({ payload }) {
  yield put(addLoading(true));

  try {
    yield call(instance.delete, `tests/${payload}`);
    yield put(deleteTest(payload));
    yield put(addLoading(false));
  } catch (e) {
    yield put(
      addError(
        `Failed to delete test: ${
          e.response.data.error || e.message.toLowerCase()
        }.`
      )
    );
    yield put(addLoading(false));
  }
}
