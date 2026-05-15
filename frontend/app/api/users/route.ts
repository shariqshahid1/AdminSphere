import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { auth } from '@clerk/nextjs/server';

// @desc    Get all users
// @route   GET /api/users
export async function GET() {
  try {
    await dbConnect();
    
    // Check authentication with Clerk
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
    }

    const users = await User.find().sort({ createdAt: -1 });
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
    await dbConnect();

    // Check authentication and authorization with Clerk
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
    }

    // In a real app, you'd check for Admin role here
    // For now, we'll allow any authenticated user to create (matching existing frontend logic)

    const body = await req.json();
    const user = await User.create(body);
    
    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
