import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { SignUp } from "./pages";

function App() {
  return (
    <Switch>
      <Route exact path="/signup" component={SignUp} />
    </Switch>
  );
}
export default App;
