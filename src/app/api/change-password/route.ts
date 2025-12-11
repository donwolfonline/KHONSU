import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { jwtVerify } from 'jose';

export async function POST(req: NextRequest) {
    try {
        // Get token from cookie
        const token = req.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        // Verify JWT token
        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET || 'default-secret-key-change-me'
        );

        const { payload } = await jwtVerify(token, secret);
        const userId = payload.userId as string;

        // Get request body
        const { currentPassword, newPassword, confirmPassword } = await req.json();

        // Validate inputs
        if (!currentPassword || !newPassword || !confirmPassword) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        if (newPassword !== confirmPassword) {
            return NextResponse.json(
                { error: 'New passwords do not match' },
                { status: 400 }
            );
        }

        if (newPassword.length < 6) {
            return NextResponse.json(
                { error: 'New password must be at least 6 characters long' },
                { status: 400 }
            );
        }

        // Get user from database
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Verify current password
        const isValidPassword = await bcrypt.compare(currentPassword, user.passwordHash);

        if (!isValidPassword) {
            return NextResponse.json(
                { error: 'Current password is incorrect' },
                { status: 401 }
            );
        }

        // Hash new password
        const newPasswordHash = await bcrypt.hash(newPassword, 10);

        // Update password in database
        await prisma.user.update({
            where: { id: userId },
            data: { passwordHash: newPasswordHash },
        });

        return NextResponse.json(
            { message: 'Password changed successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Change password error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
