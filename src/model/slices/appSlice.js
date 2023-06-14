import { createSlice } from "@reduxjs/toolkit";

const session = JSON.parse(localStorage.getItem("session")) || null;

const initialState = {
  loading: false,
  error: null,
  success: null,
  session,
};

const appSlice = createSlice({
  name: "app",
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
      state.session = action.payload;
    },
  },
});

export const { addLoading, addError, addSuccess, addSession } =
  appSlice.actions;

export default appSlice.reducer;
