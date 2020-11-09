import React, { useCallback } from "react";
import PropTypes from "prop-types";
import {
    TableCell,
    IconButton,
    Tooltip,
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";

import { RowPropTypes } from "../../utils/Table/PropTypes";
import { getFieldValue } from "../../utils/Table/utils";
import { connect } from "react-redux";
import { addSnackbar } from "../../actions/notificationActions";

const sleep = (millis) => new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, millis);

});

const removeItem = async (rowId) => {
    // This simulates a call to an API, but does not actually do anything
    console.info("Calling API to remove row", rowId);
    await sleep(100);
    // In order to force an error, uncomment below line
    // throw new Error(`Something was wrong with ${rowId}`);

    return 0;
};

const BaseRowActions = ({
    row, removeItemRow, undoRemoveItemRow, submitUndoableAction,
}) => {

    const handleRemove = useCallback(
        () => {
            removeItemRow(row);
            submitUndoableAction(
                row.key,
                `Removed ${getFieldValue(row, "name")}.`,
                () => {
                    removeItem(row.key);

                },
                () => {
                    undoRemoveItemRow(row);
                },
                3000
            );
        }, [removeItemRow, row, submitUndoableAction, undoRemoveItemRow]);


    return (
        <>
            <TableCell align="right">
                <Tooltip
                    title="Remove"
                    placement="top"
                >
                    <IconButton
                        aria-label="Remove"
                        onClick={handleRemove}
                    >
                        <Clear />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </>
    );
};

BaseRowActions.propTypes = {
    row: RowPropTypes,
    removeItemRow: PropTypes.func.isRequired,
    undoRemoveItemRow: PropTypes.func.isRequired,
    submitUndoableAction: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
    addSnackbar: (notification) => dispatch(addSnackbar(notification)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseRowActions);
