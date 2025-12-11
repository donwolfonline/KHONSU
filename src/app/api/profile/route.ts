import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';

async function getUserFromToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return null;
    }

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
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                username: true,
                bio: true,
                image: true,
                themeId: true,
                customBackground: true,
                fontColor: true,
                fontFamily: true,
                buttonShape: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ user });
    } catch (error) {
        console.error('Profile fetch error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function PUT(req: Request) {
    try {
        const userId = await getUserFromToken();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await req.json();
        console.log('Profile update request body:', body);
        const { name, bio, image, themeId, username, customBackground, fontColor, fontFamily, buttonShape } = body;

        // Check username uniqueness if it's being updated
        if (username) {
            const existingUser = await prisma.user.findUnique({
                where: { username },
            });

            if (existingUser && existingUser.id !== userId) {
                console.log('Username taken:', username);
                return NextResponse.json(
                    { error: 'Username is already taken' },
                    { status: 400 }
                );
            }
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                ...(name !== undefined && { name }),
                ...(bio !== undefined && { bio }),
                ...(image !== undefined && { image }),
                ...(themeId !== undefined && { themeId }),
                ...(username !== undefined && { username }),
                ...(customBackground !== undefined && { customBackground }),
                ...(fontColor !== undefined && { fontColor }),
                ...(fontFamily !== undefined && { fontFamily }),
                ...(buttonShape !== undefined && { buttonShape }),
            },
            select: {
                id: true,
                name: true,
                username: true,
                bio: true,
                image: true,
                themeId: true,
                customBackground: true,
                fontColor: true,
                fontFamily: true,
                buttonShape: true,
            },
        });

        console.log('User updated:', user);

        return NextResponse.json({ user, message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Profile update error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
