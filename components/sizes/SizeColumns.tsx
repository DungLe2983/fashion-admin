'use client';

import { ColumnDef } from '@tanstack/react-table';
import Delete from '../custom-ui/Delete';
import Link from 'next/link';

export const columns: ColumnDef<SizeType>[] = [
    {
        accessorKey: 'title',
        header: 'Title',
        cell: ({ row }) => (
            <Link
                href={`/sizes/${row.original._id}`}
                className='hover:text-blue-1'
            >
                {row.original.title}
            </Link>
        ),
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => <p>{row.original.description}</p>,
    },
    {
        accessorKey: 'products',
        header: 'Products',
        cell: ({ row }) => <p>{row.original.products.length}</p>,
    },
    {
        accessorKey: 'Actions',
        cell: ({ row }) => <Delete item='color' id={row.original._id} />,
    },
];
