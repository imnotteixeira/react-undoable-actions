import React from "react";
import { Paper } from "@material-ui/core";

import { columns } from "./TableSchema";
import BaseTable from "../../utils/Table/BaseTable";
import MutableDataTable from "../../utils/Table/MutableDataTable";

import RowActions from "./Actions";

const demoRows = {
    // eslint-disable-next-line max-len
    "key1": { fields: { name: { value: "Onions", align: "left" }  } },
    // eslint-disable-next-line max-len
    "key2": { fields: { name: { value: "Potatoes", align: "left" }  } },
    // eslint-disable-next-line max-len
    "key3": { fields: { name: { value: "Cookies", align: "left"  }  } },
    // eslint-disable-next-line max-len
    "key4": { fields: { name: { value: "Milk", align: "left" }  } },
    // eslint-disable-next-line max-len
    "key5": { fields: { name: { value: "Eggs", align: "left" }  } },
};


const UndoableWidget = () => (
    <>
        <Paper style={{ width: "60%", padding: "24px 72px", boxSizing: "content-box" }}>
            <MutableDataTable
                tableType={BaseTable}
                title="My Shopping List"
                rows={demoRows}
                columns={columns}
                RowActions={RowActions}
                rowsPerPage={5}
                stickyHeader
            />
        </Paper>
    </>
);

export default UndoableWidget;
