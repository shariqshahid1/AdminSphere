import { NextResponse } from 'next/server';
import { mockDb } from '@/lib/mock-db';
import { getUserFromRequest, hashPassword } from '@/lib/auth';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = await getUserFromRequest(req);
    if (!userId) {
      return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
    }
    const user = await mockDb.users.findById(id);
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: user });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = await getUserFromRequest(req);
    if (!userId) {
      return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
    }
    const body = await req.json();
    if (body.password) {
      body.password = await hashPassword(body.password);
    }
    const user = await mockDb.users.findByIdAndUpdate(id, body);
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: user });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = await getUserFromRequest(req);
    if (!userId) {
      return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
    }
    const user = await mockDb.users.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
