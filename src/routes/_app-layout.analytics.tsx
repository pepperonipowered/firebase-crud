import * as React from "react";

import { faker } from "@faker-js/faker";
import type { ColumnDef } from "@tanstack/react-table";
import { DataGrid } from "@/components/data-grid/data-grid";
import { DataGridKeyboardShortcuts } from "@/components/data-grid/data-grid-keyboard-shortcuts";
import { getDataGridSelectColumn } from "@/components/data-grid/data-grid-select-column";
import { useDataGrid } from "@/hooks/use-data-grid";

import { createFileRoute } from "@tanstack/react-router";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DataGridFilterMenu } from "@/components/data-grid/data-grid-filter-menu";
import { DataGridSortMenu } from "@/components/data-grid/data-grid-sort-menu";
import { DataGridRowHeightMenu } from "@/components/data-grid/data-grid-row-height-menu";
import { DataGridViewMenu } from "@/components/data-grid/data-grid-view-menu";
import {
    useDataGridUndoRedo,
    type UndoRedoCellUpdate,
} from "@/hooks/use-data-grid-undo-redo";
import { columns } from "@/components/data-table/columns";
import type { Applicant } from "@/types/intern-types";
import { sampleApplicant } from "@/lib/sampleData";

export const Route = createFileRoute("/_app-layout/analytics")({
    component: RouteComponent,
});

function RouteComponent() {
    const [data, setData] = React.useState<Applicant[]>(sampleApplicant);

    const { trackCellsUpdate, trackRowsAdd, trackRowsDelete } =
        useDataGridUndoRedo({
            data,
            onDataChange: setData,
            getRowId: (row) => row.id,
        });

    const onDataChange = React.useCallback(
        (newData: Applicant[]) => {
            // Track cell updates for undo/redo
            const cellUpdates: Array<UndoRedoCellUpdate> = [];

            for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
                const oldRow = data[rowIndex];
                const newRow = newData[rowIndex];
                if (!oldRow || !newRow) continue;

                const keys = Object.keys(oldRow) as Array<keyof Applicant>;
                for (const key of keys) {
                    const oldValue = oldRow[key];
                    const newValue = newRow[key];
                    if (!Object.is(oldValue, newValue)) {
                        cellUpdates.push({
                            rowId: oldRow.id,
                            columnId: String(key),
                            previousValue: oldValue,
                            newValue,
                        });
                    }
                }
            }

            if (cellUpdates.length > 0) {
                trackCellsUpdate(cellUpdates);
            }

            setData(newData);
        },
        [data, trackCellsUpdate],
    );

    const onRowAdd = React.useCallback(() => {
        // Use a sample applicant as a template (falling back to an empty cast) so
        // the new row includes all required Applicant fields.
        const template = sampleApplicant[0];

        const newRow: Applicant = {
            ...template,
            id: faker.string.nanoid(),
        };

        setData((prev) => [...prev, newRow]);
        trackRowsAdd([newRow]);
        return {
            rowIndex: data.length,
            columnId: "trickName",
        };
    }, [data.length, trackRowsAdd]);

    const onRowsDelete = React.useCallback(
        (rows: Applicant[]) => {
            trackRowsDelete(rows);
            setData((prev) => prev.filter((row) => !rows.includes(row)));
        },
        [trackRowsDelete],
    );

    const { table, ...dataGridProps } = useDataGrid({
        columns,
        data,
        onDataChange,
        onRowAdd,
        onRowsDelete,
        getRowId: (row) => row.id,
        initialState: {
            columnPinning: {
                left: ["select"],
            },
        },
        enablePaste: true,
    });

    return (
        <TooltipProvider>
            <div className="flex flex-col gap-4 w-full mx-auto max-w-7xl my-16">
                {/* Toolbar */}
                <div
                    role="toolbar"
                    aria-orientation="horizontal"
                    className="flex items-center gap-2 self-end"
                >
                    <DataGridFilterMenu table={table} />
                    <DataGridSortMenu table={table} />
                    <DataGridRowHeightMenu table={table} />
                    <DataGridViewMenu table={table} />
                </div>

                <DataGridKeyboardShortcuts
                    enableSearch={!!dataGridProps.searchState}
                />
                <DataGrid
                    table={table}
                    stretchColumns={true}
                    {...dataGridProps}
                />
            </div>
        </TooltipProvider>
    );
}
