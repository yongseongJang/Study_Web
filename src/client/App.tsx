import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { Main, Login, SignUp, ProductList, Product, Error } from "./pages";
import { Header, Footer } from "./components";
import "./styles/App.scss";

function App() {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/member/login" component={Login} />
        <Route path="/member/join" component={SignUp} />
        <Route exact path="/products/:category" component={ProductList} />
        <Route path="/products/:category/:productId" component={Product} />
        <Route component={Error} />
      </Switch>
      <Footer />
    </div>
  );
}
export default App;
