'use client';

import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import Delete from '../custom-ui/Delete';

export const columns: ColumnDef<UserType>[] = [
    // {
    //     accessorKey: '_id',
    //     header: 'ID',
    // },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
            <Link
                href={`/users/${row.original._id}`}
                className='hover:text-blue-1'
            >
                {row.original.name}
            </Link>
        ),
    },

    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'phoneNumber',
        header: 'Phone',
    },
    {
        accessorKey: 'address',
        header: 'Address',
    },
    {
        accessorKey: 'sex',
        header: 'Sex',
    },
    {
        accessorKey: 'birthday',
        header: 'Birthday',
        cell: ({ row }) => <p>{row.original.birthday.toLocaleDateString()}</p>,
    },
    {
        id: 'actions',
        cell: ({ row }) => <Delete item='users' id={row.original._id} />,
    },
];
