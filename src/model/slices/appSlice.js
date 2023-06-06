import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: null,
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
  },
});

export const { addLoading, addError, addSuccess } = appSlice.actions;

export default appSlice.reducer;
