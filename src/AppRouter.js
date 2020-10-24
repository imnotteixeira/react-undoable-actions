import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import DemoApp from "./pages/DemoApp";
import NotFound from "./pages/NotFound";

const AppRouter = () => (
    <BrowserRouter basename={`${process.env.REACT_APP_BASE_ROUTE || "/"}`}>
        <Switch>
            <Route
                exact
                path="/"
            >
                <DemoApp/>
            </Route>
            <Route>
                <NotFound/>
            </Route>
        </Switch>
    </BrowserRouter>
);

export default AppRouter;
