import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import session from "./slices/sessionSlice.js";
import { rootSaga } from "./sagas/sagas.js";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { session },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
