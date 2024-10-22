import Promotion from '@/lib/models/Promotion';
import { connectToDB } from '@/lib/mongoDB';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();

        const promotions = await Promotion.find().sort({ createdAt: 'desc' });

        return NextResponse.json(promotions, { status: 200 });
    } catch (err) {
        console.log('[promotions_GET]', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};

export const POST = async (req: NextRequest) => {
    try {
        await connectToDB();

        const { code, name, count, percent, price_promotion } =
            await req.json();

        const existingPromotion = await Promotion.findOne({ name });

        if (existingPromotion) {
            return new NextResponse('Promotion already exists', {
                status: 400,
            });
        }

        if (!code) {
            return new NextResponse('code is required', {
                status: 400,
            });
        }

        const newPromotion = await Promotion.create({
            code,
            name,
            count,
            percent,
            price_promotion,
        });

        await newPromotion.save();

        return NextResponse.json(newPromotion, { status: 200 });
    } catch (err) {
        console.log('[promotions_POST]', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};

export const dynamic = 'force-dynamic';
