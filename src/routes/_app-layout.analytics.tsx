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
import { getFilterFn } from "@/lib/data-grid-filters";

export const Route = createFileRoute("/_app-layout/analytics")({
    component: RouteComponent,
});

interface SkateTrick {
    id: string;
    trickName?: string;
    skaterName?: string;
    difficulty?: "beginner" | "intermediate" | "advanced" | "expert";
    variant?: "flip" | "grind" | "grab" | "transition" | "manual" | "slide";
    landed?: boolean;
    attempts?: number;
    bestScore?: number;
    location?: string;
    dateAttempted?: string;
}

const skateSpots = [
    "Venice Beach Skate Park",
    "Burnside Skate Park",
    "Love Park (Philadelphia)",
    "MACBA (Barcelona)",
    "Southbank (London)",
    "FDR Skate Park",
    "Brooklyn Banks",
    "El Toro High School",
    "Hubba Hideout",
    "Wallenberg High School",
    "EMB (Embarcadero)",
    "Pier 7 (San Francisco)",
] as const;

const skateTricks = {
    flip: [
        "Kickflip",
        "Heelflip",
        "Tre Flip",
        "Hardflip",
        "Inward Heelflip",
        "Frontside Flip",
        "Backside Flip",
        "Varial Flip",
        "Varial Heelflip",
        "Double Flip",
        "Laser Flip",
        "Anti-Casper Flip",
        "Casper Flip",
        "Impossible",
        "360 Flip",
        "Big Spin",
        "Bigspin Flip",
    ],
    grind: [
        "50-50 Grind",
        "5-0 Grind",
        "Nosegrind",
        "Crooked Grind",
        "Feeble Grind",
        "Smith Grind",
        "Lipslide",
        "Boardslide",
        "Tailslide",
        "Noseslide",
        "Bluntslide",
        "Nollie Backside Lipslide",
        "Switch Frontside Boardslide",
    ],
    grab: [
        "Indy Grab",
        "Melon Grab",
        "Stalefish",
        "Tail Grab",
        "Nose Grab",
        "Method",
        "Mute Grab",
        "Crail Grab",
        "Seatbelt Grab",
        "Roast Beef",
        "Chicken Wing",
        "Tweaked Indy",
        "Japan Air",
    ],
    transition: [
        "Frontside Air",
        "Backside Air",
        "McTwist",
        "540",
        "720",
        "900",
        "Frontside 180",
        "Backside 180",
        "Frontside 360",
        "Backside 360",
        "Alley-Oop",
        "Fakie",
        "Revert",
        "Carve",
        "Pump",
        "Drop In",
    ],
    manual: [
        "Manual",
        "Nose Manual",
        "Casper",
        "Rail Stand",
        "Pogo",
        "Handstand",
        "One Foot Manual",
        "Spacewalk",
        "Truckstand",
        "Primo",
    ],
    slide: [
        "Powerslide",
        "Bert Slide",
        "Coleman Slide",
        "Pendulum Slide",
        "Stand-up Slide",
        "Toeside Slide",
        "Heelside Slide",
    ],
} as const;

function generateTrickData(): SkateTrick[] {
    return Array.from({ length: 30 }, () => {
        const variant = faker.helpers.arrayElement(
            Object.keys(skateTricks) as Array<keyof typeof skateTricks>,
        );
        const trickName = faker.helpers.arrayElement(skateTricks[variant]);
        const skaterName = faker.person.fullName();
        const attempts = faker.number.int({ min: 1, max: 50 });
        const landed = faker.datatype.boolean(0.6);

        const getDifficulty = (trick: string): SkateTrick["difficulty"] => {
            const expertTricks = [
                "Tre Flip",
                "900",
                "McTwist",
                "Laser Flip",
                "Impossible",
            ];
            const advancedTricks = [
                "Hardflip",
                "720",
                "540",
                "Crooked Grind",
                "Switch Frontside Boardslide",
            ];
            const intermediateTricks = [
                "Kickflip",
                "Heelflip",
                "Frontside 180",
                "50-50 Grind",
                "Boardslide",
            ];

            if (expertTricks.some((t) => trick.includes(t))) return "expert";
            if (advancedTricks.some((t) => trick.includes(t)))
                return "advanced";
            if (intermediateTricks.some((t) => trick.includes(t)))
                return "intermediate";
            return "beginner";
        };

        const difficulty = getDifficulty(trickName);

        return {
            id: faker.string.nanoid(),
            trickName,
            skaterName,
            difficulty,
            variant,
            landed,
            attempts,
            bestScore: landed
                ? faker.number.int({ min: 6, max: 10 })
                : faker.number.int({ min: 1, max: 5 }),
            location: faker.helpers.arrayElement(skateSpots),
            dateAttempted:
                faker.date
                    .between({
                        from: new Date(2023, 0, 1),
                        to: new Date(),
                    })
                    .toISOString()
                    .split("T")[0] ?? "",
        };
    });
}

function RouteComponent() {
    const [data, setData] = React.useState<SkateTrick[]>(generateTrickData());

    const columns = React.useMemo<ColumnDef<SkateTrick>[]>(
        () => [
            getDataGridSelectColumn<SkateTrick>(),

            {
                id: "trickName",
                accessorKey: "trickName",
                header: "Trick name",
                filterFn: getFilterFn<SkateTrick>(),
                meta: {
                    label: "Trick name",
                    cell: {
                        variant: "short-text",
                    },
                },
                minSize: 180,
            },
            {
                id: "skaterName",
                accessorKey: "skaterName",
                header: "Skater",
                meta: {
                    cell: {
                        variant: "short-text",
                    },
                },
                minSize: 150,
            },
            {
                id: "difficulty",
                accessorKey: "difficulty",
                header: "Difficulty",
                meta: {
                    cell: {
                        variant: "select",
                        options: [
                            { label: "Beginner", value: "beginner" },
                            { label: "Intermediate", value: "intermediate" },
                            { label: "Advanced", value: "advanced" },
                            { label: "Expert", value: "expert" },
                        ],
                    },
                },
                minSize: 120,
            },
            {
                id: "variant",
                accessorKey: "variant",
                header: "Category",
                meta: {
                    cell: {
                        variant: "select",
                        options: [
                            { label: "Flip", value: "flip" },
                            { label: "Grind", value: "grind" },
                            { label: "Grab", value: "grab" },
                            { label: "Transition", value: "transition" },
                            { label: "Manual", value: "manual" },
                            { label: "Slide", value: "slide" },
                        ],
                    },
                },
                minSize: 120,
            },
            {
                id: "landed",
                accessorKey: "landed",
                header: "Landed",
                meta: {
                    cell: {
                        variant: "checkbox",
                    },
                },
                minSize: 100,
            },
            {
                id: "attempts",
                accessorKey: "attempts",
                header: "Attempts",
                meta: {
                    cell: {
                        variant: "number",
                        min: 1,
                        max: 100,
                    },
                },
                minSize: 100,
            },
            {
                id: "bestScore",
                accessorKey: "bestScore",
                header: "Score",
                meta: {
                    cell: {
                        variant: "number",
                        min: 1,
                        max: 10,
                    },
                },
                minSize: 110,
            },
            {
                id: "location",
                accessorKey: "location",
                header: "Location",
                meta: {
                    cell: {
                        variant: "select",
                        options: skateSpots.map((spot) => ({
                            label: spot,
                            value: spot,
                        })),
                    },
                },
                minSize: 180,
            },
            {
                id: "dateAttempted",
                accessorKey: "dateAttempted",
                header: "Attempted at",
                meta: {
                    cell: {
                        variant: "date",
                    },
                },
                minSize: 130,
            },
        ],
        [],
    );

    const { trackCellsUpdate, trackRowsAdd, trackRowsDelete } =
        useDataGridUndoRedo({
            data,
            onDataChange: setData,
            getRowId: (row) => row.id,
        });

    const onDataChange = React.useCallback(
        (newData: SkateTrick[]) => {
            // Track cell updates for undo/redo
            const cellUpdates: Array<UndoRedoCellUpdate> = [];

            for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
                const oldRow = data[rowIndex];
                const newRow = newData[rowIndex];
                if (!oldRow || !newRow) continue;

                const keys = Object.keys(oldRow) as Array<keyof SkateTrick>;
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
        const newRow: SkateTrick = { id: faker.string.nanoid() };
        setData((prev) => [...prev, newRow]);
        trackRowsAdd([newRow]);
        return {
            rowIndex: data.length,
            columnId: "trickName",
        };
    }, [data.length, trackRowsAdd]);

    const onRowsDelete = React.useCallback(
        (rows: SkateTrick[]) => {
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
        autoFocus: true,
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
