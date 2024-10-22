'use client';

import { ColumnDef } from '@tanstack/react-table';
import Delete from '../custom-ui/Delete';
import Link from 'next/link';

export const columns: ColumnDef<PromotionType>[] = [
    {
        accessorKey: 'code',
        header: 'Code',
        cell: ({ row }) => (
            <Link
                href={`/promotions/${row.original._id}`}
                className='hover:text-blue-1'
            >
                {row.original.code}
            </Link>
        ),
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => <p>{row.original.name}</p>,
    },
    {
        accessorKey: 'percent',
        header: 'Percent',
        cell: ({ row }) => <p>{row.original.percent}%</p>,
    },
    {
        accessorKey: 'price_promotion',
        header: 'Price Promotions',
        cell: ({ row }) => <p>{row.original.price_promotion.toLocaleString()}đ</p>,
    },
    {
        accessorKey: 'Actions',
        cell: ({ row }) => <Delete item='promotions' id={row.original._id} />,
    },
];
