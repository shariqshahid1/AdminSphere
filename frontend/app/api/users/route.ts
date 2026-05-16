import { NextResponse } from 'next/server';
import { mockDb } from '@/lib/mock-db';
import { auth } from '@clerk/nextjs/server';
import { protect, authorize } from '@/lib/auth';

// @desc    Get all users
// @route   GET /api/users
export async function GET(req: Request) {
  try {
    // 1. Try custom JWT auth
    const user = await protect(req);
    
    // 2. Fallback to Clerk auth
    if (!user) {
      const { userId } = await auth();
      if (!userId) {
        return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
      }
      // If using Clerk, we assume authorized for GET users
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
    // 1. Try custom JWT auth
    const user = await protect(req);
    
    // 2. Fallback to Clerk auth
    if (!user) {
      const { userId } = await auth();
      if (!userId) {
        return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
      }
    } else {
      // If using custom JWT, check for Admin role like in backend
      if (!authorize('Admin')(user)) {
        return NextResponse.json({ success: false, message: 'Not authorized for this route' }, { status: 403 });
      }
    }

    const body = await req.json();
    const newUser = await mockDb.users.create(body);
    
    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
