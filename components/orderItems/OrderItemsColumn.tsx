'use client';

import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export const columns: ColumnDef<OrderDetailType>[] = [
    {
        accessorKey: 'product',
        header: 'Product',
        cell: ({ row }) => {
            return (
                <Link
                    href={`/products/${row.original.product._id}`}
                    className='hover:text-red-1'
                >
                    {row.original.product.name}
                </Link>
            );
        },
    },
    {
        accessorKey: 'color',
        header: 'Color',
    },
    {
        accessorKey: 'size',
        header: 'Size',
    },
    {
        accessorKey: 'quantity',
        header: 'Quantity',
    },
];
