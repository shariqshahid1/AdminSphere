import { NextResponse } from 'next/server';
import { mockDb } from '@/lib/mock-db';
import { sendTokenResponse } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Please provide an email and password' }, { status: 400 });
    }

    const user = await mockDb.users.findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    // Since mock data has plain text passwords in this case, or if they were hashed:
    // For the sake of this mock, we'll assume they might be hashed or plain.
    // If user.password is 'password123', bcrypt.compare will work if we hash it first or just compare.
    // Let's assume they are hashed for consistency.
    const isMatch = await bcrypt.compare(password, user.password || '');

    if (!isMatch && password !== user.password) { // Fallback for plain text in mock
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const responseData = sendTokenResponse(user);
    return NextResponse.json(responseData, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
