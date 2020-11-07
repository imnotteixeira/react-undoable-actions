import { Button } from "@material-ui/core";
import React, { useState } from "react";
import UndoableWidget from "../components/ShoppingList/UndoableWidget";
import CenteredComponent from "../components/utils/CenteredComponent";
import { useTimeout } from "../hooks/useTimeout";

const DemoTimer = () => {
    const [completed, setCompleted] = useState(false);
    const { resume, pause, cancel } = useTimeout(
        () => {
            setCompleted(true);
        },
        3000
    );

    return (
        <>
            {completed ? "RIIIING" : "Tik...Tok...Tik...Tok..."}
            <Button onClick={pause}>Pause</Button>
            <Button onClick={resume}>Resume</Button>
            <Button onClick={cancel}>Cancel</Button>
        </>
    );
};

const DemoApp = () => (
    <>
        <CenteredComponent>
            <DemoTimer />
            <UndoableWidget />
        </CenteredComponent>
    </>
);

export default DemoApp;
