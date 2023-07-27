import { call, put } from "redux-saga/effects";

import { instance } from "./instance.js";
import { addLoading, addError } from "../slices/sessionSlice.js";
import {
  getTests,
  addNewTest,
  addNewQuestion,
  addNewAnswer,
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

export function* fetchNewAnswer({ path, answer }) {
  const resp = yield call(instance.post, `${path}/answers`, answer);
  yield put(addNewAnswer(resp.data));
}

export function* fetchNewQuestion({ path, question }) {
  if (question.answers) {
    const { title, question_type, answers } = question;

    const resp = yield call(instance.post, `${path}/questions`, {
      title,
      question_type,
    });
    yield put(addNewQuestion(resp.data));

    const answersPayload = yield answers.map(({ value, isRight }) => ({
      text: value,
      is_right: isRight,
    }));

    for (const answer of answersPayload) {
      yield call(fetchNewAnswer, {
        path: `/questions/${resp.data.id}`,
        answer,
      });
    }
  } else {
    const resp = yield call(instance.post, `${path}/questions`, question);
    yield put(addNewQuestion(resp.data));
  }
}

export function* fetchNewTest({ payload: { title, questions } }) {
  yield put(addLoading(true));

  try {
    const resp = yield call(instance.post, "tests", { title });
    yield put(addNewTest(resp.data));

    const questionsPayload = yield questions.map(
      ({ title, type, answers, number_answer }) =>
        number_answer
          ? { title, question_type: type, answer: +number_answer }
          : { title, question_type: type, answers }
    );

    for (const question of questionsPayload) {
      yield call(fetchNewQuestion, {
        path: `/tests/${resp.data.id}`,
        question,
      });
    }

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
