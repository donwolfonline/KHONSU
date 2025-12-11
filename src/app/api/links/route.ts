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
    } catch {
        return null;
    }
}

export async function GET() {
    try {
        const userId = await getUserFromToken();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const links = await prisma.link.findMany({
            where: { userId },
            orderBy: { order: 'asc' },
        });

        return NextResponse.json({ links });
    } catch (error) {
        console.error('Links fetch error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const userId = await getUserFromToken();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { title, url, type } = await req.json();

        const maxOrder = await prisma.link.findFirst({
            where: { userId },
            orderBy: { order: 'desc' },
            select: { order: true },
        });

        const link = await prisma.link.create({
            data: {
                userId,
                title,
                url,
                type: type || 'custom',
                order: (maxOrder?.order ?? -1) + 1,
            },
        });

        return NextResponse.json({ link, message: 'Link created' });
    } catch (error) {
        console.error('Link create error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const userId = await getUserFromToken();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id, title, url, type, isVisible } = await req.json();

        const link = await prisma.link.updateMany({
            where: { id, userId },
            data: {
                ...(title !== undefined && { title }),
                ...(url !== undefined && { url }),
                ...(type !== undefined && { type }),
                ...(isVisible !== undefined && { isVisible }),
            },
        });

        return NextResponse.json({ message: 'Link updated' });
    } catch (error) {
        console.error('Link update error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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
            return NextResponse.json({ error: 'Link ID required' }, { status: 400 });
        }

        await prisma.link.deleteMany({
            where: { id, userId },
        });

        return NextResponse.json({ message: 'Link deleted' });
    } catch (error) {
        console.error('Link delete error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
