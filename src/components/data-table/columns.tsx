import { type ColumnDef } from "@tanstack/react-table";
import { type Applicant } from "@/types/intern-types";
import { getFilterFn } from "@/lib/data-grid-filters";
import { getDataGridSelectColumn } from "../data-grid/data-grid-select-column";

export const columns: ColumnDef<Applicant>[] = [
    getDataGridSelectColumn<Applicant>(),
    {
        id: "firstName",
        header: "First name",
        accessorFn: (row) => row.personalInformation.firstName,
        filterFn: getFilterFn<Applicant>(),
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
        filterFn: getFilterFn<Applicant>(),
        meta: {
            label: "Middle name",
            cell: {
                variant: "short-text",
            },
        },
    },
    {
        id: "lastName",
        header: "Last name",
        accessorFn: (row) => row.personalInformation.lastName,
        filterFn: getFilterFn<Applicant>(),
        meta: {
            label: "Last name",
            cell: {
                variant: "short-text",
            },
        },
    },
    {
        id: "address",
        header: "Address",
        accessorFn: (row) => row.personalInformation.address,
        filterFn: getFilterFn<Applicant>(),
        meta: {
            label: "Address",
            cell: {
                variant: "short-text",
            },
        },
    },
    {
        id: "birthDate",
        header: "Birth date",
        accessorFn: (row) =>
            row.personalInformation.birthDate
                .toDate()
                .toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
        filterFn: getFilterFn<Applicant>(),
        meta: {
            label: "Birth date",
            cell: {
                variant: "date",
            },
        },
    },
    {
        id: "age",
        accessorFn: (row) => row.personalInformation.age,
        filterFn: getFilterFn<Applicant>(),
        header: "Age",
        meta: {
            label: "Age",
            cell: {
                variant: "number",
            },
        },
    },
    {
        id: "gender",
        accessorFn: (row) => row.personalInformation.gender,
        filterFn: getFilterFn<Applicant>(),
        header: "Gender",
        meta: {
            label: "Gender",
            cell: {
                variant: "select",
                options: [
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Other", value: "other" },
                ],
            },
        },
    },
    {
        id: "civilStatus",
        accessorFn: (row) => row.personalInformation.civilStatus,
        filterFn: getFilterFn<Applicant>(),
        header: "Civil status",
        meta: {
            label: "Civil status",
            cell: {
                variant: "select",
                options: [
                    { label: "Single", value: "single" },
                    { label: "Married", value: "married" },
                    { label: "Divorced", value: "divorced" },
                    { label: "Widowed", value: "widowed" },
                ],
            },
        },
    },
    {
        id: "phoneNumber",
        accessorFn: (row) => row.personalInformation.phoneNumber,
        filterFn: getFilterFn<Applicant>(),
        header: "Phone number",
        meta: {
            label: "Phone number",
            cell: {
                variant: "short-text",
            },
        },
    },
    {
        id: "landlineNumber",
        accessorFn: (row) => row.personalInformation.landlineNumber,
        filterFn: getFilterFn<Applicant>(),
        header: "Landline number",
        meta: {
            label: "Landline number",
            cell: {
                variant: "short-text",
            },
        },
    },
    {
        id: "email",
        accessorFn: (row) => row.personalInformation.email,
        filterFn: getFilterFn<Applicant>(),
        header: "Email",
        meta: {
            label: "Email",
            cell: {
                variant: "short-text",
            },
        },
    },
];
