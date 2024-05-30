import Category from '@/lib/models/Category';
import Collection from '@/lib/models/Collection';
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

        const existingCollection = await Category.findOne({ name });

        if (existingCollection) {
            return new NextResponse('Collection already exists', {
                status: 400,
            });
        }

        if (!name) {
            return new NextResponse('name are required', {
                status: 400,
            });
        }

        const newCollection = await Category.create({
            name,
            description,
        });

        await newCollection.save();

        return NextResponse.json(newCollection, { status: 200 });
    } catch (err) {
        console.log('[collections_POST]', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};
export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();

        const categories = await Category.find().sort({ createdAt: 'desc' });

        return NextResponse.json(categories, { status: 200 });
    } catch (err) {
        console.log('[collections_GET]', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};

export const dynamic = 'force-dynamic';
