import { NextResponse } from 'next/server';
import { mockDb } from '@/lib/mock-db';
import { auth } from '@clerk/nextjs/server';

// @desc    Get all users
// @route   GET /api/users
export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
    }

    const users = await mockDb.users.find();
    return NextResponse.json({ success: true, count: users.length, data: users });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

// @desc    Create user
// @route   POST /api/users
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
    }

    const body = await req.json();
    const newUser = await mockDb.users.create(body);
    
    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
