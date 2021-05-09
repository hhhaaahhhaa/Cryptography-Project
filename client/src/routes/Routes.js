import React from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import MainPage from "../pages/MainPage";

function Routes() {
    return (
        <Route exact path="/">
            <MainPage />
        </Route>
        /*
        <Switch>
        </Switch>
        */
    );
}

export default Routes;
