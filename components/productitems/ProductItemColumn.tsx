'use client';

import { ColumnDef } from '@tanstack/react-table';

import Link from 'next/link';
import Delete from '../custom-ui/Delete';

export const columns: ColumnDef<ProductItemType>[] = [
    {
        accessorKey: 'product_id',
        header: 'Product',
        cell: ({ row }) => (
            <Link
                href={`/productitems/${row.original._id}`}
                className='hover:text-red-1 font-semibold'
            >
                {row.original.product_id}
            </Link>
        ),
    },
    {
        accessorKey: 'color_id',
        header: 'Color',
        cell: ({ row }) => <p>{row.original.color_id}</p>,
    },
    {
        accessorKey: 'size_id',
        header: 'Size',
        cell: ({ row }) => <p>{row.original.size_id}</p>,
    },
    {
        accessorKey: 'quantity',
        header: 'Quantity',
        cell: ({ row }) => (
            <p className='w-60 text-[14px]'>{row.original.quantity}</p>
        ),
    },
    {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => (
            <p className='w-60 text-[14px]'>{row.original.price}</p>
        ),
    },

    {
        id: 'actions',
        cell: ({ row }) => <Delete item='productitems' id={row.original._id} />,
    },
];
