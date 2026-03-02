import { type ColumnDef } from "@tanstack/react-table";
import { type Applicant } from "@/types/intern-types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<Applicant>[] = [
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original;

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
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(payment.id)
                            }
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>
                            View payment details
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
        size: 48, // 👈 small fixed width
        minSize: 48,
        maxSize: 48,
        enableColumnFilter: false,
        enableResizing: false,
        enableHiding: false,
    },
    {
        id: "firstName",
        header: "First name",
        accessorFn: (row) => row.personalInformation.firstName,
        meta: {
            label: "First name",
            cell: {
                variant: "short-text",
            },
        },
    },
    {
        id: "middleName",
        header: "Middle name",
        accessorFn: (row) => row.personalInformation.middleName,
    },
    {
        id: "lastName",
        header: "Last name",
        accessorFn: (row) => row.personalInformation.lastName,
    },
    {
        id: "address",
        header: "Address",
        accessorFn: (row) => row.personalInformation.address,
    },
    {
        id: "birthDate",
        accessorFn: (row) =>
            row.personalInformation.birthDate
                .toDate()
                .toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
        header: "Birth date",
    },
    {
        id: "age",
        accessorFn: (row) => row.personalInformation.age,
        header: "Age",
    },
    {
        id: "gender",
        accessorFn: (row) => row.personalInformation.gender,
        header: "Gender",
    },
    {
        id: "civilStatus",
        accessorFn: (row) => row.personalInformation.civilStatus,
        header: "Civil status",
    },
    {
        id: "phoneNumber",
        accessorFn: (row) => row.personalInformation.phoneNumber,
        header: "Phone number",
    },
    {
        id: "landlineNumber",
        accessorFn: (row) => row.personalInformation.landlineNumber,
        header: "Landline number",
    },
    {
        id: "email",
        accessorFn: (row) => row.personalInformation.email,
        header: "Email",
    },
];
