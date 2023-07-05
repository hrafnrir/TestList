import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import session from "./slices/sessionSlice.js";
import test from "./slices/testSlice.js";
import { rootSaga } from "./sagas/rootSaga.js";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { session, test },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
