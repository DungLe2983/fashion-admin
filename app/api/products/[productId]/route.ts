import Category from '@/lib/models/Category';
import Product from '@/lib/models/Product';
import { connectToDB } from '@/lib/mongoDB';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
    req: NextRequest,
    { params }: { params: { productId: string } }
) => {
    try {
        await connectToDB();

        const product = await Product.findById(params.productId).populate({
            path: 'category_id',
            model: Category,
        });

        if (!product) {
            return new NextResponse(
                JSON.stringify({ message: 'product not found' }),
                { status: 404 }
            );
        }
        // console.log('pro==========', product);
        return NextResponse.json(product, { status: 200 });
    } catch (err) {
        console.log('[productId_GET]', err);
        return new NextResponse('Internal error', { status: 500 });
    }
};
export const POST = async (
    req: NextRequest,
    { params }: { params: { productId: string } }
) => {
    try {
        // const { userId } = auth();

        // if (!userId) {
        //     return new NextResponse('Unauthorized', { status: 401 });
        // }

        await connectToDB();

        const product = await Product.findById(params.productId);

        if (!product) {
            return new NextResponse(
                JSON.stringify({ message: 'Product not found' }),
                { status: 404 }
            );
        }

        const { name, description, image, categories } = await req.json();

        if (!name || !description || !image || !categories) {
            return new NextResponse('Not enough data to create a new product', {
                status: 400,
            });
        }

        const addedCollections = categories.filter(
            (categoryId: string) => !product.category_id.includes(categoryId)
        );
        // // included in new data, but not included in the previous data

        const removedCollections = product.category_id.filter(
            (categoryId: string) => !categories.includes(categoryId)
        );
        // included in previous data, but not included in the new data

        // Update collections
        // await Promise.all([
        //     // Update added collections with this product
        //     ...addedCollections.map((categoryId: string) =>
        //         Category.findByIdAndUpdate(categoryId, {
        //             $push: { products: product._id },
        //         })
        //     ),

        //     // Update removed collections without this product
        //     ...removedCollections.map((categoryId: string) =>
        //         Category.findByIdAndUpdate(categoryId, {
        //             $pull: { products: product._id },
        //         })
        //     ),
        // ]);

        // Update product
        const updatedProduct = await Product.findByIdAndUpdate(
            product._id,
            {
                name,
                description,
                image,
                category_id: categories,
            },
            { new: true }
        ).populate({ path: 'category_id', model: Category });

        await updatedProduct.save();

        return NextResponse.json(updatedProduct, { status: 200 });
    } catch (err) {
        console.log('[productId_POST]', err);
        return new NextResponse('Internal error', { status: 500 });
    }
};

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { productId: string } }
) => {
    try {
        // const { userId } = auth();

        // if (!userId) {
        //     return new NextResponse('Unauthorized', { status: 401 });
        // }

        await connectToDB();

        const product = await Product.findById(params.productId);

        if (!product) {
            return new NextResponse(
                JSON.stringify({ message: 'Product not found' }),
                { status: 404 }
            );
        }

        await Product.findByIdAndDelete(product._id);

        // Update collections
        // await Promise.all(
        //     product.categories.map((categoryId: string) =>
        //         Category.findByIdAndUpdate(categoryId, {
        //             $pull: { products: product._id },
        //         })
        //     )
        // );

        return new NextResponse(
            JSON.stringify({ message: 'Product deleted' }),
            {
                status: 200,
            }
        );
    } catch (err) {
        console.log('[productId_DELETE]', err);
        return new NextResponse('Internal error', { status: 500 });
    }
};
