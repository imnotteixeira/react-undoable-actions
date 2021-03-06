import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import BaseTable from "./BaseTable";
import MutableDataTable from "./MutableDataTable";
import { RowPropTypes } from "./PropTypes";


export const ControlledFilterableTable = ({
    tableComponent: TableComponent = BaseTable,
    initialRows,
    rows,
    setRows,
    ...props
}) => {
    const [activeFilters, setActiveFilters] = useState({});

    useEffect(() => {
        const newRows = Object.values(activeFilters).reduce((updatedRows, filter) => filter(updatedRows), initialRows);
        setRows(newRows);
    }, [activeFilters, initialRows, setRows]);
    return (
        <TableComponent
            rows={rows}
            setRows={setRows}
            filterable
            setActiveFilters={setActiveFilters}
            hasActiveFilters={Object.keys(activeFilters).length > 0}
            TableToolbarProps={{
                activeFilters,
            }}
            {...props}
        />
    );
};

ControlledFilterableTable.propTypes = {
    rows: PropTypes.objectOf(RowPropTypes).isRequired,
    setRows: PropTypes.func,
    filters: PropTypes.arrayOf(
        PropTypes.shape({
            render: PropTypes.elementType.isRequired,
            id: PropTypes.string.isRequired,
        })
    ).isRequired,
    tableComponent: PropTypes.elementType,
};

const FilterableTable = (props) => (
    <MutableDataTable tableType={ControlledFilterableTable} {...props} />
);

export default FilterableTable;
