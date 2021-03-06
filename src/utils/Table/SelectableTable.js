import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";

import { RowPropTypes } from "./PropTypes";
import BaseTable from "./BaseTable";
import MutableDataTable from "./MutableDataTable";

export const ControlledSelectableTable = ({
    tableComponent: TableComponent = BaseTable,
    ...props
}) => {

    const [selected, setSelected] = useState({});
    const [selectedRows, setSelectedRows] = useState({});

    const { rows, TableToolbarProps } = props;

    const isRowSelected = useCallback(
        // eslint-disable-next-line no-prototype-builtins
        (rowKey) => selected.hasOwnProperty(rowKey),
        [selected],
    );

    const resetSelected = () => {
        setSelected({});
    };

    const onPageChange = () => {
        resetSelected();
    };

    useEffect(() => {
        if (TableToolbarProps.activeFilters)
            resetSelected();
    }, [TableToolbarProps.activeFilters]);

    useEffect(() => {
        setSelectedRows(
            Object.entries(rows)
                .filter(([key]) => isRowSelected(key))
                .reduce((selectedRows, [key, row]) => {
                    selectedRows[key] = row;
                    return selectedRows;
                }, {})
        );

    }, [isRowSelected, rows]);


    const handleSelect = useCallback((event, name) => {
        if (isRowSelected(name)) {
            // eslint-disable-next-line no-unused-vars
            const { [name]: keyToDelete, ...newSelected } = selected;
            setSelected(newSelected);
        } else {
            setSelected((selected) => ({ ...selected, [name]: true }));
        }
    }, [isRowSelected, selected]);

    const handleSelectAll = useCallback((page, rowsPerPage) => (event) => {
        if (event.target.checked) {
            const newSelected = { ...selected };
            rows
                .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                .forEach(({ key }) => {
                    newSelected[key] = true;
                });
            setSelected(newSelected);
            return;
        }
        resetSelected();
    }, [rows, selected]);


    const numSelected = Object.keys(selected).length;

    return (
        <TableComponent
            numSelected={numSelected}
            selectedRows={selectedRows}
            handleSelect={handleSelect}
            handleSelectAll={handleSelectAll}
            onPageChange={onPageChange}
            isRowSelected={isRowSelected}
            {...props}
        />
    );
};

ControlledSelectableTable.propTypes = {
    rows: PropTypes.objectOf(RowPropTypes),
    TableToolbarProps: PropTypes.shape({
        activeFilters: PropTypes.object,
    }),
};

const SelectableTable = (props) => (
    <MutableDataTable tableType={ControlledSelectableTable} {...props} />
);

export default SelectableTable;
