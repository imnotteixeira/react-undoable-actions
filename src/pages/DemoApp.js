import { Button, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import UndoableWidget from "../components/ShoppingList/UndoableWidget";
import CenteredComponent from "../components/utils/CenteredComponent";
import { useTimeout } from "../hooks/useTimeout";
import UndoProvider, { UndoableActions } from "../utils/UndoProvider";

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

const DemoUndo = () => {
    const { submitAction } = useContext(UndoableActions);

    const handleClick = () => {
        submitAction(
            "id",
            "An action!",
            () => {
                console.log("I'm going to do something since the time has passed!");
            },
            () => {
                console.log("The action was cancelled! I won't do anything else");
            },
            3000
        );
    };

    return (
        <div>
            <Typography>Undo Me! Open your console for details and click the button below.</Typography>
            <Button onClick={handleClick}>Generate Undoable Action</Button>
        </div>
    );
};

const DemoApp = () => (
    <>
        <UndoProvider>
            <CenteredComponent>
                <DemoTimer />
                <DemoUndo />
                <UndoableWidget />
            </CenteredComponent>
        </UndoProvider>
    </>
);

export default DemoApp;
