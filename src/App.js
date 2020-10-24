import React from "react";
import AppRouter from "./AppRouter";
import Notifier from "./components/Notifications/Notifier";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "react-redux";
import store from "./store";

const App = () => (
    <Provider store={store}>
        <React.Fragment>
            <CssBaseline />
            <Notifier />
            <AppRouter/>
        </React.Fragment>
    </Provider>
);

export default App;
