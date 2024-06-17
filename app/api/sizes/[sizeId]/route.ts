import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongoDB';
import { auth } from '@clerk/nextjs/server';
import Product from '@/lib/models/Product';
import Size from '@/lib/models/Size';

export const GET = async (
    req: NextRequest,
    { params }: { params: { sizeId: string } }
) => {
    try {
        await connectToDB();

        const size = await Size.findById(params.sizeId);

        if (!size) {
            return new NextResponse(
                JSON.stringify({ message: 'Size not found' }),
                { status: 404 }
            );
        }

        return NextResponse.json(size, { status: 200 });
    } catch (err) {
        console.log('[sizeId_GET]', err);
        return new NextResponse('Internal error', { status: 500 });
    }
};

export const POST = async (
    req: NextRequest,
    { params }: { params: { sizeId: string } }
) => {
    try {
        // const { userId } = auth();

        // if (!userId) {
        //     return new NextResponse('Unauthorized', { status: 401 });
        // }

        await connectToDB();

        let size = await Size.findById(params.sizeId);

        if (!size) {
            return new NextResponse('size not found', { status: 404 });
        }

        const { name, description } = await req.json();

        if (!name) {
            return new NextResponse('name are required', {
                status: 400,
            });
        }

        size = await Size.findByIdAndUpdate(
            params.sizeId,
            { name, description },
            { new: true }
        );

        await size.save();

        return NextResponse.json(size, { status: 200 });
    } catch (err) {
        console.log('[sizeId_POST]', err);
        return new NextResponse('Internal error', { status: 500 });
    }
};

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { sizeId: string } }
) => {
    try {
        // const { userId } = auth();

        // if (!userId) {
        //     return new NextResponse('Unauthorized', { status: 401 });
        // }

        await connectToDB();

        await Size.findByIdAndDelete(params.sizeId);

        return new NextResponse('Size is deleted', { status: 200 });
    } catch (err) {
        console.log('[sizeId_DELETE]', err);
        return new NextResponse('Internal error', { status: 500 });
    }
};
