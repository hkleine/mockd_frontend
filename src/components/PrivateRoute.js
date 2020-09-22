import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";


const PrivateRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
    })}
    {...args}
  />
);

export default PrivateRoute;