import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongoDB';

import Product from '@/lib/models/Product';
import User from '@/lib/models/User';

export const GET = async (
    req: NextRequest,
    { params }: { params: { userId: string } }
) => {
    try {
        await connectToDB();

        const user = await User.findById(params.userId);

        if (!user) {
            return new NextResponse(
                JSON.stringify({ message: 'user not found' }),
                { status: 404 }
            );
        }

        return NextResponse.json(user, { status: 200 });
    } catch (err) {
        console.log('[user_GET]', err);
        return new NextResponse('Internal error', { status: 500 });
    }
};

export const POST = async (
    req: NextRequest,
    { params }: { params: { userId: string } }
) => {
    try {
        await connectToDB();

        let user = await User.findById(params.userId);

        if (!user) {
            return new NextResponse('user not found', { status: 404 });
        }

        const {
            name,
            email,
            password,
            phoneNumber,
            address,
            sex,
            birthday,
            cart_id,
        } = await req.json();

        if (!name) {
            return new NextResponse('Name are required', {
                status: 400,
            });
        }

        user = await User.findByIdAndUpdate(
            params.userId,
            {
                name,
                email,
                password,
                phoneNumber,
                address,
                sex,
                birthday,
                cart_id,
            },
            { new: true }
        );

        await user.save();

        return NextResponse.json(user, { status: 200 });
    } catch (err) {
        console.log('[userId_POST]', err);
        return new NextResponse('Internal error', { status: 500 });
    }
};

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { userId: string } }
) => {
    try {

        await connectToDB();

        await User.findByIdAndDelete(params.userId);
        // await Product.updateMany(
        //     { colors: params.userId },
        //     { $pull: { colors: params.userId } }
        // );

        return new NextResponse('User is deleted', { status: 200 });
    } catch (err) {
        console.log('[colorId_DELETE]', err);
        return new NextResponse('Internal error', { status: 500 });
    }
};
