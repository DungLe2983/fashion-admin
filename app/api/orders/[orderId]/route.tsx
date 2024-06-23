import Order from '@/lib/models/Order';
import Product from '@/lib/models/Product';
import Size from '@/lib/models/Size';
import Color from '@/lib/models/Color';
import ProductItem from '@/lib/models/ProductItem';
import User from '@/lib/models/User';
import OrderDetail from '@/lib/models/order-detail';
import { connectToDB } from '@/lib/mongoDB';
import { DatabaseBackup } from 'lucide-react';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export const GET = async (
    req: NextRequest,
    { params }: { params: { orderId: string } }
) => {
    try {
        await connectToDB();

        const order = await Order.findById(params.orderId)
            .populate({ path: 'user_id', model: User })
            .populate({ path: 'detail_id', model: OrderDetail });

        const cartItems = await OrderDetail.find({
            order_id: params.orderId,
        }).populate({
            path: 'product_item_id',
            model: ProductItem,
            populate: [
                { path: 'product_id', model: Product },
                { path: 'color_id', model: Color },
                { path: 'size_id', model: Size },
            ],
        });

        const copiedOrder = {
            _id: order._id,
            user_id: order.user_id.name,
            detail_id: cartItems,
            phone: order.phone,
            address: order.address,
            note: order.note,
            total: order.total,
            dateCreated: order.dateCreated,
            status: order.status,
        };

        // console.log('copiedList:', copiedOrder);

        return new NextResponse(JSON.stringify({ data: copiedOrder }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.log('[orderId_GET]', err);
        return new NextResponse('Internal error', { status: 500 });
    }
};

export const PUT = async (req: NextRequest, context: any) => {
    try {
        const data = context.params;
        if (!data || !data.orderId) {
            return NextResponse.json(
                { message: 'Thieu thong tin can thiet' },
                { status: 400 }
            );
        }

        await connectToDB();
        const order = await Order.findById(data.orderId);

        const cartItems = await OrderDetail.find({
            order_id: data.orderId,
        }).populate({
            path: 'product_item_id',
            model: ProductItem,
            populate: [
                { path: 'product_id', model: Product },
                { path: 'color_id', model: Color },
                { path: 'size_id', model: Size },
            ],
        });

        order.status = '1';

        order.save();
        console.log('Cart items', cartItems);

        for (const cartItem of cartItems) {
            const productItem = cartItem.product_item_id;

            productItem.quantity -= cartItem.quantity;

            await productItem.save();
        }

        console.log('Cart items after update', cartItems);

        return NextResponse.json(order, { status: 200 });
    } catch (err) {
        console.log('[orderId_POST]', err);
        return new NextResponse('Internal error', { status: 500 });
    }
};
