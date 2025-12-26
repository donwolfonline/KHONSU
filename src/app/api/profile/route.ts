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
                email: true,
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
        console.log('API Route CWD:', process.cwd());
        // console.log('API Route DATABASE_URL:', process.env.DATABASE_URL); // Careful with secrets

        const userId = await getUserFromToken();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await req.json();
        console.log('Profile update request body:', body);
        const { name, bio, image, themeId, username, customBackground, fontColor, fontFamily, buttonShape, email } = body;

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

        // Check email uniqueness if it's being updated
        if (email) {
            const existingUser = await prisma.user.findUnique({
                where: { email },
            });

            if (existingUser && existingUser.id !== userId) {
                console.log('Email taken:', email);
                return NextResponse.json(
                    { error: 'Email is already taken' },
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
                ...(email !== undefined && { email }),
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
                email: true,
            },
        });

        console.log('User updated:', user);

        return NextResponse.json({ user, message: 'Profile updated successfully' });
    } catch (error: any) {
        console.error('Profile update CRITICAL error:', error);
        // Log the full error object structure
        console.dir(error, { depth: null });
        return NextResponse.json(
            {
                error: error?.message || 'Unknown error occurred',
                details: JSON.stringify(error, Object.getOwnPropertyNames(error))
            },
            { status: 500 }
        );
    }
}
