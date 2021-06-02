import { useState } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import AllBlogsPage from "./containers/AllBlogsPage";
import HomePage from "./containers/HomePage";

function App() {
  const auth = useSelector((state) => state.auth);

  // if (!auth.token) {
  //   return <HomePage />;
  // }

  return (
    <div className="">
      <Router>
        <Switch>
        <Route exact path="/">
          <HomePage />
          </Route>
          <ProtectedRoute
            exact
            path="/allblogs"
            component={AllBlogsPage}
            auth={auth}
          />
          <Route path="">
            <Redirect to="/allblogs" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
