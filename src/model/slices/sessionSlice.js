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

    endSession(state) {
      state.sessionData = null;
    },
  },
});

export const signUp = createAction("session/signUp");
export const signIn = createAction("session/signIn");
export const logout = createAction("session/logout");

export const { addLoading, addError, addSuccess, addSession, endSession } =
  sessionSlice.actions;

export default sessionSlice.reducer;
