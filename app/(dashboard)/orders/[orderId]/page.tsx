'use client';

import Loader from '@/components/custom-ui/Loader';
import OrderForm from '@/components/orders/OrderForm';
import { useEffect, useState } from 'react';

const OrderDetails = ({ params }: { params: { orderId: string } }) => {
    const [loading, setLoading] = useState(true);
    const [orderDetails, setOrderDetails] = useState<ProductItemType | null>(
        null
    );

    const getOrderDetails = async () => {
        try {
            const res = await fetch(`/api/orders/${params.orderId}`, {
                method: 'GET',
            });
            const data = await res.json();
            setOrderDetails(data.data);
            setLoading(false);
        } catch (err) {
            console.log('[orderId_GET]', err);
        }
    };

    useEffect(() => {
        getOrderDetails();
    }, []);

    return loading ? <Loader /> : <OrderForm initialData={orderDetails} />;
};

export default OrderDetails;
