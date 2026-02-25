import { type ColumnDef } from "@tanstack/react-table";
import { type Applicant } from "@/types/intern-types";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Timestamp } from "firebase/firestore";

export const columns: ColumnDef<Applicant>[] = [
    {
        id: "actions",
        cell: () => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            View employee details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            View contract details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit employee</DropdownMenuItem>
                        <DropdownMenuItem>Delete employee</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
    {
        id: "fullName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Full name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        accessorFn: (row) =>
            `${row.personalInformation.firstName} ${row.personalInformation.middleName} ${row.personalInformation.lastName}`,
        cell: ({ row }) => {
            const { firstName, middleName, lastName } =
                row.original.personalInformation;
            return <span>{`${firstName} ${middleName} ${lastName}`}</span>;
        },
        filterFn: (row, columnId, filterValue: string) => {
            const fullName = row.getValue<string>(columnId).toLowerCase();
            const tokens = filterValue.toLowerCase().trim().split(/\s+/);
            return tokens.every((token) => fullName.includes(token));
        },
    },
    {
        accessorFn: (row) => {
            const birthDate = row.personalInformation.birthDate;
            return birthDate instanceof Timestamp ? birthDate.toDate() : null;
        },
        header: "Birth date",
        cell: ({ getValue }) => {
            const birthDate = getValue<Date | null>();

            if (birthDate instanceof Date) {
                return <span>{birthDate.toLocaleDateString()}</span>;
            }

            return <span></span>;
        },
    },
    {
        accessorFn: (row) => row.personalInformation.age,
        header: "Age",
    },
    {
        accessorFn: (row) => row.personalInformation.email,
        header: "Email",
    },
    {
        accessorFn: (row) => row.personalInformation.gender,
        header: "Gender",
    },
    {
        accessorFn: (row) => row.personalInformation.civilStatus,
        header: "Civil status",
    },
    {
        accessorFn: (row) => row.personalInformation.phoneNumber,
        header: "Phone number",
    },
    {
        accessorFn: (row) => row.personalInformation.landlineNumber,
        header: "Landline number",
    },
    {
        accessorFn: (row) => row.personalInformation.email,
        header: "Email",
    },
];
