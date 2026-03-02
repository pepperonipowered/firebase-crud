import React from "react";
import {
    type ColumnDef,
    type SortingState,
    type ColumnFiltersState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type Header,
    type ColumnPinningState,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    type DragEndEvent,
    MouseSensor,
    TouchSensor,
    KeyboardSensor,
    DragOverlay,
} from "@dnd-kit/core";

import {
    SortableContext,
    arrayMove,
    horizontalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { GripVertical } from "lucide-react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

function getPinnedStyles(column: any, isHeader = false): React.CSSProperties {
    const pin = column.getIsPinned();
    const isLastLeft = pin === "left" && column.getIsLastColumn("left");
    const isFirstRight = pin === "right" && column.getIsFirstColumn("right");

    if (!pin) return {};

    return {
        position: "sticky",
        left: pin === "left" ? column.getStart("left") : undefined,
        right: pin === "right" ? column.getAfter("right") : undefined,
        zIndex: isHeader ? 20 : 10,
        backgroundColor: "hsl(var(--background))", // ✅ use backgroundColor, not background
        // ✅ Replace divide-x with explicit borders on pinned columns
        borderRight: isLastLeft ? "1px solid hsl(var(--border))" : undefined,
        borderLeft: isFirstRight ? "1px solid hsl(var(--border))" : undefined,
        // Optional shadow for visual depth
        boxShadow: isLastLeft
            ? "4px 0 4px -2px hsl(var(--border))"
            : isFirstRight
              ? "-4px 0 4px -2px hsl(var(--border))"
              : undefined,
    };
}

function SortableHeader<TData>({ header }: { header: Header<TData, unknown> }) {
    const isActions = header.column.id === "actions";
    const pinnedStyles = getPinnedStyles(header.column, true);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: header.column.id,
        disabled: isActions, // Disable dragging for the "actions" column
    });

    const style: React.CSSProperties = {
        opacity: isDragging ? 0.8 : 1,
        position: "relative",
        transform: CSS.Translate.toString(transform), // 👈 important
        transition,
        whiteSpace: "nowrap",
        width: header.column.getSize(), // 👈 controlled width
        zIndex: isDragging ? 1 : 0,
        ...pinnedStyles,
    };

    if (isDragging) {
        return (
            <TableHead ref={setNodeRef} style={style} className="bg-accent" />
        );
    }

    return (
        <TableHead
            ref={setNodeRef}
            style={style}
            className="select-none overflow-hidden"
        >
            <div className="flex items-center gap-1 w-full">
                {/* Drag handle */}
                {!isActions && (
                    <GripVertical
                        size={16}
                        {...attributes}
                        {...listeners}
                        className="cursor-grab active:cursor-grabbing text-muted-foreground"
                    />
                )}
                {/* Header content */}
                <div className="truncate">
                    {header.isPlaceholder
                        ? null
                        : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                          )}
                </div>
            </div>
        </TableHead>
    );
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const [columnOrder, setColumnOrder] = React.useState<string[]>(() =>
        columns.map((c) => c.id!),
    );
    const [activeColumn, setActiveColumn] = React.useState<Header<
        TData,
        unknown
    > | null>(null);

    const [columnPinning, setColumnPinning] =
        React.useState<ColumnPinningState>({
            left: ["actions", "firstName"],
            right: [],
        });

    const table = useReactTable({
        data,
        columns,
        columnResizeMode: "onChange",
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onColumnPinningChange: setColumnPinning,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            columnOrder,
            columnPinning,
            rowSelection,
        },
        defaultColumn: {
            size: 225, //starting column size
            minSize: 64, //enforced during column resizing
            maxSize: 512, //enforced during column resizing
        },
    });

    // reorder columns after drag & drop
    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (
            !over ||
            active.id === "actions" ||
            over.id === "actions" ||
            active.id === over.id
        )
            return;

        if (active && over && active.id !== over.id) {
            setColumnOrder((columnOrder) => {
                const oldIndex = columnOrder.indexOf(active.id as string);
                const newIndex = columnOrder.indexOf(over.id as string);
                return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
            });
        }
    }

    const sensors = useSensors(
        useSensor(MouseSensor, {}),
        useSensor(TouchSensor, {}),
        useSensor(KeyboardSensor, {}),
    );

    return (
        <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToHorizontalAxis]}
            onDragStart={(event) => {
                const header = table
                    .getHeaderGroups()[0]
                    .headers.find((h) => h.column.id === event.active.id);
                if (header) setActiveColumn(header);
            }}
            onDragEnd={(event) => {
                handleDragEnd(event);
                setActiveColumn(null);
            }}
            sensors={sensors}
        >
            <div>
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Filter names..."
                        value={
                            (table
                                .getColumn("fullName")
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table
                                .getColumn("fullName")
                                ?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="overflow-x-auto rounded-md border">
                    <Table className="min-w-full table-fixed">
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <SortableContext
                                    key={headerGroup.id}
                                    items={columnOrder.filter(
                                        (id) => id !== "actions",
                                    )}
                                    strategy={horizontalListSortingStrategy}
                                >
                                    <TableRow
                                        key={headerGroup.id}
                                        className="divide-x w-full"
                                    >
                                        {headerGroup.headers.map((header) => (
                                            <SortableHeader
                                                key={header.id}
                                                header={header}
                                            />
                                        ))}
                                    </TableRow>
                                </SortableContext>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                style={{
                                                    width: cell.column.getSize(),
                                                    ...getPinnedStyles(
                                                        cell.column,
                                                        false,
                                                    ),
                                                }}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        {activeColumn && (
                            <DragOverlay
                                dropAnimation={{
                                    duration: 250,
                                    easing: "cubic-bezier(0.25, 1, 0.5, 1)", // smooth ease-out
                                }}
                            >
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow className="cursor-grabbing select-none bg-accent divide-x">
                                            <TableHead
                                                style={{
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <div className="flex items-center gap-1 w-full">
                                                    {/* Visual-only handle */}
                                                    <GripVertical
                                                        size={16}
                                                        className="cursor-grab active:cursor-grabbing text-muted-foreground"
                                                    />
                                                    {/* Header content */}
                                                    <div className="truncate">
                                                        {flexRender(
                                                            activeColumn.column
                                                                .columnDef
                                                                .header,
                                                            activeColumn.getContext(),
                                                        )}
                                                    </div>
                                                </div>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                </Table>
                            </DragOverlay>
                        )}
                    </Table>
                </div>
                <div className="flex flex-row w-full items-center justify-between">
                    <div className="text-muted-foreground text-sm">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s)
                        selected.
                    </div>
                    <div className="flex items-center justify-end space-x-2 py-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </DndContext>
    );
}
