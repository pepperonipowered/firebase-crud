import { type ColumnDef } from "@tanstack/react-table";
import { type Applicant } from "@/types/intern-types";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Applicant>[] = [
    {
        id: "fullName",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Full Name <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        accessorFn: (row) =>
            `${row.personalInformation.firstName} ${row.personalInformation.middleName} ${row.personalInformation.lastName}`,
        cell: ({ row }) => {
            const { firstName, middleName, lastName } =
                row.original.personalInformation;
            return <span>{`${firstName} ${middleName} ${lastName}`}</span>;
        },
    },
    {
        accessorFn: (row) => row.personalInformation.email,
        header: "Email",
    },
];
