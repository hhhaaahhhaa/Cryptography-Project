import React from "react";
import { Switch } from "react-router-dom";
import SignInPage from "../pages/SignInPage";
import MainPage from "../pages/MainPage";
import AuthRoute from "./AuthRoute";
import ProtectRoute from "./ProtectRoute";

function Routes() {
  return (
    <Switch>
      <AuthRoute exact path="/" component={SignInPage} />
      <AuthRoute exact path="/login" component={SignInPage} />
      <ProtectRoute exact path="/dashboard" component={MainPage} />
    </Switch>
  );
}

export default Routes;
