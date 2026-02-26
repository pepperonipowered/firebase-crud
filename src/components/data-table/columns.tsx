import { type ColumnDef } from "@tanstack/react-table";
import { type Applicant } from "@/types/intern-types";

export const columns: ColumnDef<Applicant>[] = [
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
