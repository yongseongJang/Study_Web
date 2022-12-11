import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import { Router } from "react-router-dom";
import { history } from "./utils/history";
import { CookiesProvider } from "react-cookie";
import App from "./App";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware] as const,
});

export type RootState = ReturnType<typeof rootReducer>;

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </CookiesProvider>,

  document.getElementById("root"),
);
