import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongoDB';
import { auth } from '@clerk/nextjs/server';
import Product from '@/lib/models/Product';
import Color from '@/lib/models/Color';

export const GET = async (
    req: NextRequest,
    { params }: { params: { colorId: string } }
) => {
    try {
        await connectToDB();

        const color = await Color.findById(params.colorId);

        if (!color) {
            return new NextResponse(
                JSON.stringify({ message: 'Color not found' }),
                { status: 404 }
            );
        }

        return NextResponse.json(color, { status: 200 });
    } catch (err) {
        console.log('[colorId_GET]', err);
        return new NextResponse('Internal error', { status: 500 });
    }
};

export const POST = async (
    req: NextRequest,
    { params }: { params: { colorId: string } }
) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        await connectToDB();

        let color = await Color.findById(params.colorId);

        if (!color) {
            return new NextResponse('color not found', { status: 404 });
        }

        const { name, description } = await req.json();

        if (!name) {
            return new NextResponse('Name are required', {
                status: 400,
            });
        }

        color = await Color.findByIdAndUpdate(
            params.colorId,
            { name, description },
            { new: true }
        );

        await color.save();

        return NextResponse.json(color, { status: 200 });
    } catch (err) {
        console.log('[colorId_POST]', err);
        return new NextResponse('Internal error', { status: 500 });
    }
};

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { colorId: string } }
) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        await connectToDB();

        await Color.findByIdAndDelete(params.colorId);
        await Product.updateMany(
            { colors: params.colorId },
            { $pull: { colors: params.colorId } }
        );

        return new NextResponse('color is deleted', { status: 200 });
    } catch (err) {
        console.log('[colorId_DELETE]', err);
        return new NextResponse('Internal error', { status: 500 });
    }
};
