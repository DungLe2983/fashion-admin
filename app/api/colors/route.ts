import Color from '@/lib/models/Color';
import { connectToDB } from '@/lib/mongoDB';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    try {
        // const { userId } = auth();

        // if (!userId) {
        //     return new NextResponse('Unauthorized', { status: 403 });
        // }

        await connectToDB();

        const { name, description } = await req.json();

        const existingColor = await Color.findOne({ name });

        if (existingColor) {
            return new NextResponse('Color already exists', {
                status: 400,
            });
        }

        if (!name) {
            return new NextResponse('name is required', {
                status: 400,
            });
        }

        const newColor = await Color.create({
            name,
            description,
        });

        await newColor.save();

        return NextResponse.json(newColor, { status: 200 });
    } catch (err) {
        console.log('[colors_POST]', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};
export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();

        const colors = await Color.find().sort({ createdAt: 'desc' });

        return NextResponse.json(colors, { status: 200 });
    } catch (err) {
        console.log('[colors_GET]', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};

export const dynamic = 'force-dynamic';
