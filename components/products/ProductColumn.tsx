'use client';

import { ColumnDef } from '@tanstack/react-table';

import Link from 'next/link';
import Delete from '../custom-ui/Delete';

export const columns: ColumnDef<ProductType>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
            <Link
                href={`/products/${row.original._id}`}
                className='hover:text-red-1 font-semibold'
            >
                {row.original.name}
            </Link>
        ),
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => <p className='w-60 text-[14px]'>{row.original.description}</p>,
    },
    {
        accessorKey: 'category_id',
        header: 'Categories',
        cell: ({ row }) => (
            <p>{row.original.category_id.map((c) => c.name).join(', ')}</p>
        ),
    },
    {
        accessorKey: 'image',
        header: 'Image',
        cell: ({ row }) => (
            <img
                src={row.original.image}
                className='w-40 h-40 object-cover'
                alt='Image'
            />
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => <Delete item='products' id={row.original._id} />,
    },
];
