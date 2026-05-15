import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { auth } from '@clerk/nextjs/server';
import { protect, authorize } from '@/lib/auth';

// @desc    Get single user
// @route   GET /api/users/:id
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    // 1. Try custom JWT auth
    let userAuth = await protect(req);
    
    // 2. Fallback to Clerk auth
    if (!userAuth) {
      const { userId } = await auth();
      if (!userId) {
        return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
      }
    }

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

// @desc    Update user
// @route   PUT /api/users/:id
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    // 1. Try custom JWT auth
    let userAuth = await protect(req);
    
    // 2. Fallback to Clerk auth
    if (!userAuth) {
      const { userId } = await auth();
      if (!userId) {
        return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
      }
    } else {
      // If using custom JWT, check for Admin role like in backend
      if (!authorize('Admin')(userAuth)) {
        return NextResponse.json({ success: false, message: 'Not authorized for this route' }, { status: 403 });
      }
    }

    const body = await req.json();
    const user = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

// @desc    Delete user
// @route   DELETE /api/users/:id
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    // 1. Try custom JWT auth
    let userAuth = await protect(req);
    
    // 2. Fallback to Clerk auth
    if (!userAuth) {
      const { userId } = await auth();
      if (!userId) {
        return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
      }
    } else {
      // If using custom JWT, check for Admin role like in backend
      if (!authorize('Admin')(userAuth)) {
        return NextResponse.json({ success: false, message: 'Not authorized for this route' }, { status: 403 });
      }
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
