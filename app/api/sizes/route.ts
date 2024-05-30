import Size from '@/lib/models/Size';
import { connectToDB } from '@/lib/mongoDB';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    try {
        await connectToDB();

        const data = await req.json();

        // const existingSize = await Size.find({ name: name });

        // if (existingSize) {
        //     return new NextResponse('Size already exists', {
        //         status: 400,
        //     });
        // }

        if (!data.name) {
            return new NextResponse('name is required', {
                status: 400,
            });
        }

        const newSize = await Size.create(data);

        // await newSize.save();

        return NextResponse.json(newSize, { status: 200 });
    } catch (err) {
        console.log('[sizes_POST]', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};
export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();

        const sizes = await Size.find().sort({ createdAt: 'desc' });

        return NextResponse.json(sizes, { status: 200 });
    } catch (err) {
        console.log('[sizes_GET]', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};

export const dynamic = 'force-dynamic';
