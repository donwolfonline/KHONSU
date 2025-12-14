import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';

async function getUserFromToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) return null;

    try {
        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET || 'default-secret-key-change-me'
        );
        const { payload } = await jwtVerify(token, secret);
        return payload.userId as string;
    } catch (error) {
        console.error('JWT Verification failed:', error);
        return null;
    }
}

export async function GET() {
    try {
        const userId = await getUserFromToken();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const places = await prisma.place.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ places });
    } catch (error) {
        console.error('Places fetch error:', error);
        console.error('Error details:', error instanceof Error ? error.message : String(error));
        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
        return NextResponse.json({
            error: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const userId = await getUserFromToken();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const reqBody = await req.json();
        const { title, description, imageUrl, locationLink } = reqBody;

        if (!title || !imageUrl || !locationLink) {
            return NextResponse.json(
                { error: 'Title, image, and location link are required' },
                { status: 400 }
            );
        }

        const place = await prisma.place.create({
            data: {
                userId,
                title,
                description: description || null,
                imageUrl,
                locationLink,
                rating: reqBody.rating || 5, // Default to 5 if not provided
            },
        });

        return NextResponse.json({ place, message: 'Place created' });
    } catch (error) {
        console.error('Place create error:', error);
        console.error('Error details:', error instanceof Error ? error.message : String(error));
        return NextResponse.json({
            error: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const userId = await getUserFromToken();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const reqBody = await req.json();
        const { id, title, description, imageUrl, locationLink } = reqBody;

        if (!id) {
            return NextResponse.json({ error: 'Place ID required' }, { status: 400 });
        }

        const place = await prisma.place.updateMany({
            where: { id, userId },
            data: {
                ...(title !== undefined && { title }),
                ...(description !== undefined && { description }),
                ...(imageUrl !== undefined && { imageUrl }),
                ...(locationLink !== undefined && { locationLink }),
                ...(reqBody.rating !== undefined && { rating: reqBody.rating }),
            },
        });

        return NextResponse.json({ place, message: 'Place updated' });
    } catch (error) {
        console.error('Place update error:', error);
        return NextResponse.json({
            error: 'Internal server error',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const userId = await getUserFromToken();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Place ID required' }, { status: 400 });
        }

        await prisma.place.deleteMany({
            where: { id, userId },
        });

        return NextResponse.json({ message: 'Place deleted' });
    } catch (error) {
        console.error('Place delete error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
