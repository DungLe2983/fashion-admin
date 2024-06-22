"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Delete from "../custom-ui/Delete";

export const columns: ColumnDef<UserType>[] = [

    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <Link
                href={`/users/${row.original._id}`}
                className="hover:text-blue-1"
            >
                {row.original.name}
            </Link>
        ),
    },

    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phoneNumber",
        header: "Phone",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "sex",
        header: "Sex",
    },
    {
        accessorKey: "birthday",
        header: "Birthday",
        // cell: ({ row }) => <p>{row.original.birthday.toLocaleDateString()}</p>,
        cell: ({ row }) => {
            // Kiểm tra xem birthday có giá trị hay không
            if (row.original.birthday) {
                return <p>{row.original.birthday.toLocaleDateString()}</p>;
            } else {
                // Không hiển thị gì nếu birthday là null hoặc không tồn tại
                return null;
            }
        },
    },
    {
        accessorKey: "Actions",
        cell: ({ row }) => <Delete item="users" id={row.original._id} />,
    },
];
