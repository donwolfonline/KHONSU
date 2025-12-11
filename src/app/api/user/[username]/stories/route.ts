import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ username: string }> }
) {
    try {
        const { username } = await params;

        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Get stories from last 24 hours
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const stories = await prisma.story.findMany({
            where: {
                userId: user.id,
                createdAt: {
                    gte: twentyFourHoursAgo
                }
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ stories });
    } catch (error) {
        console.error('Public stories fetch error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
