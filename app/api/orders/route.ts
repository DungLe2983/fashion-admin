import Order from '@/lib/models/Order';
import { connectToDB } from '@/lib/mongoDB';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/lib/models/User';
import OrderDetail from '@/lib/models/order-detail';

export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();

        const orders = await Order.find()
            .sort({ createdAt: 'desc' })
            .populate({ path: 'user_id', model: User })
            .populate({ path: 'detail_id', model: OrderDetail });

        const copiedList = orders.map((order) => {
            const quantities = order.detail_id.map((detail) => detail.quantity);
            const totalQuantity = quantities.reduce(
                (total: number, quantity: number) => total + quantity,
                0
            );

            return {
                _id: order._id,
                user_id: order.user_id.name,
                detail_id: totalQuantity,
                phone: order.phone,
                address: order.address,
                note: order.note,
                total: order.total,
                dateCreated: order.dateCreated,
                status: order.status,
            };
        });
        // console.log('OrderCopylist hehe====', copiedList);

        return new NextResponse(JSON.stringify({ data: copiedList }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.log('[orders_GET]', err);
        return new NextResponse('Internal Error', { status: 500 });
    }
};
