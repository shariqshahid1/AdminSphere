import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { mockDb } from '@/lib/mock-db';

export async function GET(req: Request) {
  try {
    const userId = await getUserFromRequest(req);
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const user = await mockDb.users.findById(userId as string);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
