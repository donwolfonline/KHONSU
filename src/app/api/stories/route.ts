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

        const stories = await prisma.story.findMany({
            where: {
                userId,
                expiresAt: { gt: new Date() } // Only return non-expired stories
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ stories });
    } catch (error) {
        console.error('Stories fetch error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const userId = await getUserFromToken();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { imageUrl } = await req.json();

        if (!imageUrl) {
            return NextResponse.json({ error: 'Image URL required' }, { status: 400 });
        }

        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24);

        const story = await prisma.story.create({
            data: {
                userId,
                imageUrl,
                expiresAt,
            },
        });

        return NextResponse.json({ story, message: 'Story created' });
    } catch (error) {
        console.error('Story create error:', error);
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
            return NextResponse.json({ error: 'Story ID required' }, { status: 400 });
        }

        await prisma.story.deleteMany({
            where: { id, userId },
        });

        return NextResponse.json({ message: 'Story deleted' });
    } catch (error) {
        console.error('Story delete error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
