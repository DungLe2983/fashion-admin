import Category from '@/lib/models/Category';
import Product from '@/lib/models/Product';
import ProductItem from '@/lib/models/ProductItem';
import { connectToDB } from '@/lib/mongoDB';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
    req: NextRequest,
    { params }: { params: { productitemId: string } }
) => {
    try {
        await connectToDB();

        const productitem = await ProductItem.findById(
            params.productitemId
        ).populate({
            path: 'product_id',
            model: Product,
        });

        if (!productitem) {
            return new NextResponse(
                JSON.stringify({ message: 'productitem not found' }),
                { status: 404 }
            );
        }
        return NextResponse.json(productitem, { status: 200 });
    } catch (err) {
        console.log('[productitemId_GET]', err);
        return new NextResponse('Internal error', { status: 500 });
    }
};

export const POST = async (
    req: NextRequest,
    { params }: { params: { productitemId: string } }
) => {
    try {
        await connectToDB();

        const productitem = await ProductItem.findById(params.productitemId);

        if (!productitem) {
            return new NextResponse(
                JSON.stringify({ message: 'Product not found' }),
                { status: 404 }
            );
        }

        const data = await req.json();
        console.log('update===', data);
        return NextResponse.json(data, { status: 200 });

        // if (!data) {
        //     return new NextResponse('Not enough data to create a new product', {
        //         status: 400,
        //     });
        // }

        // // Update product
        // const updatedProductItem = await ProductItem.findByIdAndUpdate(
        //     productitem._id,
        //     {
        //         quantity: data.quantity,
        //         price: data.price,
        //     },
        //     { new: true }
        // );

        // await updatedProductItem.save();

        // return NextResponse.json(updatedProductItem, { status: 200 });
    } catch (err) {
        console.log('[productId_POST]', err);
        return new NextResponse('Internal error', { status: 500 });
    }
};

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { productitemId: string } }
) => {
    try {
        await connectToDB();

        const productitem = await ProductItem.findById(params.productitemId);
        // console.log('delete Productitem===', productitem);
        // return NextResponse.json(productitem, { status: 200 });

        if (!productitem) {
            return new NextResponse(
                JSON.stringify({ message: 'productitem not found' }),
                { status: 404 }
            );
        }

        await ProductItem.findByIdAndDelete(productitem._id);

        // Update products
        // await Promise.all(
        //     productitem.product_id.map((categoryId: string) =>
        //         Category.findByIdAndUpdate(categoryId, {
        //             $pull: { products: product._id },
        //         })
        //     )
        // );

        await Product.findByIdAndUpdate(productitem.product_id, {
            $pull: { product_item_id: productitem._id },
        });

        return new NextResponse(
            JSON.stringify({ message: 'Productitem deleted' }),
            {
                status: 200,
            }
        );
    } catch (err) {
        console.log('[productitemId_DELETE]', err);
        return new NextResponse('Internal error', { status: 500 });
    }
};
