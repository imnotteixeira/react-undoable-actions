import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { RowPropTypes } from "./PropTypes";

const MutableDataTable = ({ rows: initialRows, tableType: Table, RowActionsProps, ...props }) => {
    const [rows, setRows] = useState(initialRows);

    useEffect(() => {
        setRows(initialRows);
    }, [initialRows]);

    const removeItemRow = useCallback((row) => {
        const { key } = row;

        setRows((rows) => ({
            ...rows,
            [key]: {
                ...rows[key],
                removed: true,
            } }));
    }, []);

    const undoRemoveItemRow = useCallback((row) => {
        const { key } = row;

        setRows((rows) => ({
            ...rows,
            [key]: {
                ...rows[key],
                removed: false,
            } }));
    }, []);


    return (
        <Table
            key={JSON.stringify(initialRows).substring(0, 20)}
            initialRows={initialRows}
            rows={rows}
            setRows={setRows}
            RowActionsProps={{
                removeItemRow,
                undoRemoveItemRow,
                ...RowActionsProps,
            }}
            {...props}
        />

    );
};

MutableDataTable.propTypes = {
    rows: PropTypes.objectOf(RowPropTypes),
    tableType: PropTypes.elementType,
    RowActionsProps: PropTypes.object,
};

export default MutableDataTable;
