import Category from '@/lib/models/Category';
import Product from '@/lib/models/Product';
import { connectToDB } from '@/lib/mongoDB';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    try {
        // const { userId } = auth();

        // if (!userId) {
        //     return new NextResponse('Unauthorized', { status: 401 });
        // }

        await connectToDB();
        const data = await req.json();
        // const { name, description, image, categories } = await req.json();

        // console.log('Data============', data);

        if (!data) {
            return new NextResponse('Not enough data to create a product', {
                status: 400,
            });
        }

        const newProduct = await Product.create({
            name: data.name,
            description: data.description,
            image: data.image,
            category_id: data.categories,
        });

        await newProduct.save();
        // if (categories) {
        //     for (const categoryId of categories) {
        //         const category = await Category.findById(categoryId);
        //         if (category) {
        //             category.products.push(newProduct._id);
        //             await category.save();
        //         }
        //     }
        // }
        // return NextResponse.json(data, { status: 200 });
        return NextResponse.json(newProduct, { status: 200 });
    } catch (err) {
        console.log('[products_POST]', err);
        return new NextResponse('Internal Error', { status: 500 });
    }
};
export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();

        const products = await Product.find()
            .sort({ createdAt: 'desc' })
            .populate({ path: 'category_id', model: Category });
        const copiedList = products.map((product) => ({
            _id: product._id,
            name: product.name,
            description: product.description,
            image: product.image,
            category_id: product.category_id,
        }));
        console.log(copiedList);

        return new NextResponse(JSON.stringify({ data: copiedList }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.log('[products_GET]', err);
        return new NextResponse('Internal Error', { status: 500 });
    }
};
