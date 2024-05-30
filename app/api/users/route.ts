
import User from '@/lib/models/User';
import { connectToDB } from '@/lib/mongoDB';
import { NextRequest, NextResponse } from 'next/server';


export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();

        const users = await User.find().sort({ createdAt: 'desc' });

        return NextResponse.json(users, { status: 200 });
    } catch (err) {
        console.log('[users_GET]', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};

export const dynamic = 'force-dynamic';
