'use client';

import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import Delete from '../custom-ui/Delete';

export const columns: ColumnDef<OrderType>[] = [
    {
        accessorKey: '_id',
        header: 'Order ID',
        cell: ({ row }) => {
            return (
                <Link
                    href={`/orders/${row.original._id}`}
                    className='hover:text-red-1'
                >
                    {row.original._id}
                </Link>
            );
        },
    },
    {
        accessorKey: 'user_id',
        header: 'User',
        cell: ({ row }) => <p>{row.original.user_id}</p>,
    },
    {
        accessorKey: 'detail_id',
        header: 'Total Products',
        cell: ({ row }) => <p className='text-center'>{row.original.detail_id}</p>,
    },
    {
        accessorKey: 'phone',
        header: 'Phone',
    },
    {
        accessorKey: 'address',
        header: 'Address',
    },
    {
        accessorKey: 'note',
        header: 'Note',
    },
    {
        accessorKey: 'total',
        header: 'Total',
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
            <p
                className={`${
                    row.original.status === 1
                        ? 'bg-green-500 text-center'
                        : 'bg-orange-500  text-center'
                } text-white p-2 rounded`}
            >
                {row.original.status}
            </p>
        ),
    },
    {
        accessorKey: 'dateCreated',
        header: 'Created At',
        cell: ({ row }) => {
            const dateCreated = new Date(row.original.dateCreated);

            return (
                <p>
                    {dateCreated instanceof Date
                        ? dateCreated.toLocaleDateString()
                        : row.original.dateCreated}
                </p>
            );
        },
    },
  
];
