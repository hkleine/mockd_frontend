import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { Loading, PrivateRoute } from "./components";
import { Landing, Dashboard } from "./views";

import "./App.css";

const App = () => {

  return (
    <div id="app" className="d-flex flex-column h-100">
      <Switch>
        <PrivateRoute path="/" exact component={Dashboard} />
        {/* <PrivateRoute path="/alerts" component={} />
        <PrivateRoute path="/add" component={} /> */}

      </Switch>
    </div>
  );
};

export default App;
