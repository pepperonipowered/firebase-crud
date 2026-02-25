import { DataGrid } from "@/components/data-grid/data-grid";
import { createFileRoute } from "@tanstack/react-router";
import { sampleApplicant } from "@/lib/sampleData";
import { useDataGrid } from "@/hooks/use-data-grid";
import { columns } from "@/components/data-table/columns";
import { TooltipProvider } from "@/components/ui/tooltip";
import React from "react";
import { DataGridSortMenu } from "@/components/data-grid/data-grid-sort-menu";
import { DataGridFilterMenu } from "@/components/data-grid/data-grid-filter-menu";
import { DataGridRowHeightMenu } from "@/components/data-grid/data-grid-row-height-menu";
import { DataGridViewMenu } from "@/components/data-grid/data-grid-view-menu";
import { useDataGridUndoRedo, type UndoRedoCellUpdate } from "@/hooks/use-data-grid-undo-redo";
import type { Applicant } from "@/types/intern-types";

export const Route = createFileRoute("/_app-layout/analytics")({
    component: RouteComponent,
});

function RouteComponent() {
    const [data, setData] = React.useState(sampleApplicant);

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

                for (const key of Object.keys(oldRow)) {
                    const oldValue = oldRow[key];
                    const newValue = newRow[key];
                    if (!Object.is(oldValue, newValue)) {
                        cellUpdates.push({
                            rowId: oldRow.id,
                            columnId: key,
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
        const newRow = { id: generateId() };
        setData((prev) => [...prev, newRow]);
        trackRowsAdd([newRow]);
        return { rowIndex: data.length, columnId: "name" };
    }, [data.length, trackRowsAdd]);

    const onRowsDelete = React.useCallback(
        (rows) => {
            trackRowsDelete(rows);
            setData((prev) => prev.filter((row) => !rows.includes(row)));
        },
        [trackRowsDelete],
    );

    const { table, ...dataGridProps } = useDataGrid({
        data,
        columns,
        onDataChange: setData,
        getRowId: (row) => row.id,
        enableSearch: true,
        enablePaste: true,
    });

    return (
        <TooltipProvider>
            <div className="flex flex-col gap-4 max-w-7xl mx-auto w-full my-16">
                <div
                    role="toolbar"
                    aria-orientation="horizontal"
                    className="flex items-center gap-2"
                >
                    <DataGridFilterMenu table={table} />
                    <DataGridSortMenu table={table} />
                    <DataGridRowHeightMenu table={table} />
                    <DataGridViewMenu table={table} />
                </div>
                <DataGrid table={table} {...dataGridProps} />
            </div>
        </TooltipProvider>
    );
}
