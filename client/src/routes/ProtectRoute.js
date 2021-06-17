import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { authContext } from "../context/authContext";

function ProtectRoute({ component: Component, ...rest }) {
  const { user } = useContext(authContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectRoute;
