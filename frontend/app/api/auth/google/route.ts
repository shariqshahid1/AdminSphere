import { NextResponse } from 'next/server';
import { mockDb } from '@/lib/mock-db';
import { sendTokenResponse } from '@/lib/auth';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return NextResponse.json({ success: false, message: 'Google authentication failed' }, { status: 400 });
    }

    const { name, email } = payload;

    let user = await mockDb.users.findOne({ email: email || '' });

    if (!user) {
      // Create user if doesn't exist
      user = await mockDb.users.create({
        name: name || '',
        email: email || '',
        password: Math.random().toString(36).slice(-8), // Dummy password
        role: 'Manager'
      });
    }

    const responseData = sendTokenResponse(user);
    return NextResponse.json(responseData, { status: 200 });
  } catch (_error) {
    return NextResponse.json({ success: false, message: 'Google authentication failed' }, { status: 400 });
  }
}

