'use client';

import { ColumnDef } from '@tanstack/react-table';
import Delete from '../custom-ui/Delete';
import Link from 'next/link';

export const columns: ColumnDef<CategoryType>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
            <Link
                href={`/categories/${row.original._id}`}
                className='hover:text-blue-1'
            >
                {row.original.name}
            </Link>
        ),
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => <p>{row.original.description}</p>,
    },

    {
        accessorKey: 'Actions',
        cell: ({ row }) => <Delete item='categories' id={row.original._id} />,
    },
];
