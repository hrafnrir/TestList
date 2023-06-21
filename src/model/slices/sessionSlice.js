import { createSlice, createAction } from "@reduxjs/toolkit";

const sessionData = JSON.parse(localStorage.getItem("session")) || null;

const initialState = {
  loading: false,
  error: null,
  success: null,
  sessionData,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    addLoading(state, action) {
      state.loading = action.payload;
    },

    addError(state, action) {
      state.error = action.payload;
    },

    addSuccess(state, action) {
      state.success = action.payload;
    },

    addSession(state, action) {
      state.sessionData = action.payload;
    },
  },
});

export const signUp = createAction("session/signUp");
export const signIn = createAction("session/signIn");

export const { addLoading, addError, addSuccess, addSession } =
  sessionSlice.actions;

export default sessionSlice.reducer;
