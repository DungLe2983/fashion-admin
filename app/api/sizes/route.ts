
import Size from '@/lib/models/Size';
import { connectToDB } from '@/lib/mongoDB';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 403 });
        }

        await connectToDB();

        const { title, description } = await req.json();

        const existingSize = await Size.findOne({ title });

        if (existingSize) {
            return new NextResponse('Size already exists', {
                status: 400,
            });
        }

        if (!title) {
            return new NextResponse('Title is required', {
                status: 400,
            });
        }

        const newSize = await Size.create({
            title,
            description,
        });

        await newSize.save();

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
