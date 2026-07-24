import { NextResponse } from 'next/server';
import { mockDb } from '@/lib/mock-db';
import { hashPassword, createToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, message: 'Name, email and password are required' },
        { status: 400 }
      );
    }

    const existing = await mockDb.users.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { success: false, message: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await mockDb.users.create({
      name,
      email,
      password: hashedPassword,
      role: 'Editor',
      status: 'active',
      department: 'General',
    });

    const token = await createToken({ userId: newUser._id, email: newUser.email });

    const response = NextResponse.json(
      { success: true, data: { user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role } } },
      { status: 201 }
    );

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
