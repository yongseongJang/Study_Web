import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { Login, SignUp } from "./pages";
import "./styles/App.scss";

function App() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
    </Switch>
  );
}
export default App;
