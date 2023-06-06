import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import app from "./slices/appSlice.js";
import { rootSaga } from "./sagas/sagas.js";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: app,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
