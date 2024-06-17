import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongoDB';
import Product from '@/lib/models/Product';
import Category from '@/lib/models/Category';

export const GET = async (
    req: NextRequest,
    { params }: { params: { collectionId: string } }
) => {
    try {
        await connectToDB();

        const collection = await Category.findById(params.collectionId);

        if (!collection) {
            return new NextResponse(
                JSON.stringify({ message: 'Collection not found' }),
                { status: 404 }
            );
        }

        return NextResponse.json(collection, { status: 200 });
    } catch (err) {
        console.log('[collectionId_GET]', err);
        return new NextResponse('Internal error', { status: 500 });
    }
};

export const POST = async (
    req: NextRequest,
    { params }: { params: { collectionId: string } }
) => {
    try {

        await connectToDB();

        let category = await Category.findById(params.collectionId);

        if (!category) {
            return new NextResponse('category not found', { status: 404 });
        }

        const { name, description } = await req.json();

        if (!name) {
            return new NextResponse('Title are required', {
                status: 400,
            });
        }

        category = await Category.findByIdAndUpdate(
            params.collectionId,
            { name, description },
            { new: true }
        );

        await category.save();

        return NextResponse.json(category, { status: 200 });
    } catch (err) {
        console.log('[collectionId_POST]', err);
        return new NextResponse('Internal error', { status: 500 });
    }
};

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { collectionId: string } }
) => {
    try {
        // const { userId } = auth();

        // if (!userId) {
        //     return new NextResponse('Unauthorized', { status: 401 });
        // }

        await connectToDB();

        await Category.findByIdAndDelete(params.collectionId);

        return new NextResponse('Category is deleted', { status: 200 });
    } catch (err) {
        console.log('[collectionId_DELETE]', err);
        return new NextResponse('Internal error', { status: 500 });
    }
};
