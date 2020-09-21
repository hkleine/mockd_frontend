import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";


const PrivateRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      // onRedirecting: () => <ClimbingBoxLoader color={"#5D40B8"} loading={true} />,
    })}
    {...args}
  />
);

export default PrivateRoute;