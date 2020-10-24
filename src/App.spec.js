import React from "react";
import App from "./App";
import { SnackbarProvider } from "notistack";
import { render } from "./test-utils";

describe("App", () => {
    it("should render correctly", () => {
        expect(render(
            <SnackbarProvider maxSnack={3}>
                <App />
            </SnackbarProvider>
        ));
    });
});
