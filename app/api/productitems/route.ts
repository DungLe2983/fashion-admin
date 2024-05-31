import Color from '@/lib/models/Color';
import Product from '@/lib/models/Product';
import ProductItem from '@/lib/models/ProductItem';
import Size from '@/lib/models/Size';

import { connectToDB } from '@/lib/mongoDB';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    try {
        await connectToDB();
        const data = await req.json();
        // console.log('Data proitem === ', data);
        // return NextResponse.json(data, { status: 200 });

        if (!data) {
            return new NextResponse('Not enough data to create a productitem', {
                status: 400,
            });
        }

        const newProductItem = await ProductItem.create({
            product_id: data.product_id,
            size_id: data.size_id,
            color_id: data.color_id,
            price: data.price,
            quantity: data.quantity,
            status: data.status,
        });

        await newProductItem.save();

        if (data.product_id) {
            const product = await Product.findById(data.product_id);
            if (product) {
                product.product_item_id.push(newProductItem._id);
                await product.save();
            }
        }

        return NextResponse.json(newProductItem, { status: 200 });
    } catch (err) {
        console.log('[productitems_POST]', err);
        return new NextResponse('Internal Error', { status: 500 });
    }
};
export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();

        const productitems = await ProductItem.find()
            .sort({ createdAt: 'desc' })
            .populate({ path: 'product_id', model: Product })
            .populate({ path: 'size_id', model: Size })
            .populate({ path: 'color_id', model: Color });

        // console.log('Productitems===', productitems[0]);

        const copiedList = productitems.map((productitem) => ({
            _id: productitem._id,
            product_id: productitem.product_id.name,
            size_id: productitem.size_id.name,
            color_id: productitem.color_id.name,
            price: productitem.price,
            quantity: productitem.quantity,
            status: productitem.status,
        }));
        console.log('Copylist====', copiedList);

        return new NextResponse(JSON.stringify({ data: copiedList }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.log('[products_GET]', err);
        return new NextResponse('Internal Error', { status: 500 });
    }
};
