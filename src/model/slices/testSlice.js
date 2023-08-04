import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  tests: [],
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    getTests(state, action) {
      state.tests = action.payload;
    },

    addNewTest(state, action) {
      state.tests.unshift(action.payload);
    },

    updateTest(state, action) {
      state.tests = state.tests.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },

    deleteTest(state, action) {
      state.tests = state.tests.filter(({ id }) => id !== action.payload);
    },

    addNewQuestion(state, action) {
      state.tests.map(({ id, questions }) => {
        id === action.payload.testId &&
          questions.unshift(action.payload.question);
      });
    },

    updateQuestion(state, action) {
      state.questions.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },

    deleteQuestion(state, action) {
      state.questions.filter(({ id }) => id !== action.payload);
    },

    addNewAnswer(state, action) {
      state.tests.map(({ id, questions }) => {
        if (id === action.payload.testId) {
          questions.map(
            ({ id, answers }) =>
              id === action.payload.questionId &&
              answers.unshift(action.payload.answer)
          );
        }
      });
    },

    updateAnswer(state, action) {
      state.answers.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },

    deleteAnswer(state, action) {
      state.answers.filter(({ id }) => id !== action.payload);
    },
  },
});

export const GET_TESTS = createAction("test/GET_TESTS");
export const ADD_NEW_TEST = createAction("test/ADD_NEW_TEST");
export const UPDATE_TEST = createAction("test/UPDATE_TEST");
export const DELETE_TEST = createAction("test/DELETE_TEST");
export const UPDATE_QUESTION = createAction("test/UPDATE_QUESTION");
export const DELETE_QUESTION = createAction("test/DELETE_QUESTION");
export const UPDATE_ANSWER = createAction("test/UPDATE_ANSWER");
export const DELETE_ANSWER = createAction("test/DELETE_ANSWER");

export const {
  getTests,
  addNewTest,
  updateTest,
  deleteTest,
  addNewQuestion,
  updateQuestion,
  deleteQuestion,
  addNewAnswer,
  updateAnswer,
  deleteAnswer,
} = testSlice.actions;

export default testSlice.reducer;
