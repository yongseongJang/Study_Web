import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { Login, SignUp } from "./pages";
import { Header, Footer } from "./components";
import "./styles/App.scss";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
      <Footer />
    </React.Fragment>
  );
}
export default App;
