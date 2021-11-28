import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { Main, Login, SignUp } from "./pages";
import { Header, Footer } from "./components";
import "./styles/App.scss";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/member/login" component={Login} />
        <Route path="/member/join" component={SignUp} />
      </Switch>
      <Footer />
    </React.Fragment>
  );
}
export default App;
