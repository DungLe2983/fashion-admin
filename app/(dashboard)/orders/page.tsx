'use client';
import { DataTable } from '@/components/custom-ui/DataTable';
import Loader from '@/components/custom-ui/Loader';
import { columns } from '@/components/orders/OrderColumn';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Orders = () => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState<OrderType[]>([]);
    const router = useRouter();

    const getOrders = async () => {
        try {
            const res = await fetch('/api/orders', {
                method: 'GET',
            });
            const data = await res.json();
            setOrders(data.data);
            // console.log('OderData====', data);
            setLoading(false);
        } catch (err) {
            console.log('[orders_GET', err);
        }
    };

     useEffect(() => {
         getOrders();
     }, []);

    return loading ? (
        <Loader />
    ) : (
        <div className='px-10 py-5'>
            <p className='text-heading2-bold'>Orders</p>
            <Separator className='bg-grey-1 my-5' />
            <DataTable columns={columns} data={orders} searchKey='_id' />
        </div>
    );
};

export default Orders;
