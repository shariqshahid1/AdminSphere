import { NextResponse } from 'next/server';
import { mockDb } from '@/lib/mock-db';
import { sendTokenResponse } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    // Check if user exists
    const userExists = await mockDb.users.findOne({ email });
    if (userExists) {
      return NextResponse.json({ success: false, message: 'User already exists' }, { status: 400 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await mockDb.users.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'Manager'
    });

    const responseData = sendTokenResponse(user);
    return NextResponse.json(responseData, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
