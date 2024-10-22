import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongoDB';
import { auth } from '@clerk/nextjs/server';
import Product from '@/lib/models/Product';
import Promotion from '@/lib/models/Promotion';
import Order from '@/lib/models/Order';
import mongoose from 'mongoose';

export const GET = async (
    req: NextRequest,
    { params }: { params: { promotionId: string } }
) => {
    try {
        await connectToDB();
        const promotion = await Promotion.findById(params.promotionId);
        if (!promotion) {
            return new NextResponse(
                JSON.stringify({ message: 'promotion not found' }),
                { status: 404 }
            );
        }

        return NextResponse.json(promotion, { status: 200 });
    } catch (err) {
        console.log('[promotionId_GET]', err);
        return new NextResponse('Internal error', { status: 500 });
    }
};

export const POST = async (
    req: NextRequest,
    { params }: { params: { promotionId: string } }
) => {
    try {
        await connectToDB();

        let promotion = await Promotion.findById(params.promotionId);

        if (!promotion) {
            return new NextResponse('promotion not found', { status: 404 });
        }

        const { code, name, count, percent, price_promotion } =
            await req.json();

        if (!code) {
            return new NextResponse('Code are required', {
                status: 400,
            });
        }

        promotion = await Promotion.findByIdAndUpdate(
            params.promotionId,
            { code, name, count, percent, price_promotion },
            { new: true }
        );

        await promotion.save();

        return NextResponse.json(promotion, { status: 200 });
    } catch (err) {
        console.log('[promotionId_POST]', err);
        return new NextResponse('Internal error', { status: 500 });
    }
};

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { promotionId: string } }
) => {
    try {
        await connectToDB();
        const promotionId = new mongoose.Types.ObjectId(params.promotionId);
        const order = await Order.find({ promotion_id: promotionId });
        if (order.length > 0) {
            return new NextResponse(
                JSON.stringify({ message: 'Can not detele this Promotion!' }),
                { status: 400 }
            );
        }
        const promo = await Promotion.findByIdAndDelete(params.promotionId);

        return NextResponse.json(promo, { status: 200 });
    } catch (err) {
        console.log('[promotionId_DELETE]', err);
        return new NextResponse('Internal error', { status: 500 });
    }
};
