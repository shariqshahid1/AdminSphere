import { NextResponse } from 'next/server';
import { mockDb } from '@/lib/mock-db';
import { getUserFromRequest } from '@/lib/auth';
import { hashPassword } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const userId = await getUserFromRequest(req);
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

export async function POST(req: Request) {
  try {
    const userId = await getUserFromRequest(req);
    if (!userId) {
      return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
    }
    const body = await req.json();
    if (body.password) {
      body.password = await hashPassword(body.password);
    }
    const newUser = await mockDb.users.create(body);
    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
