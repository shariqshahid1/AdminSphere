import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import dbConnect from './db';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function protect(req: Request) {
  let token;

  const authHeader = req.headers.get('authorization');

  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    return null;
  }

  try {
    // Special case for Demo Token
    if (token === 'demo-token-123') {
      return {
        _id: 'demo-id-000',
        name: 'Demo Admin',
        email: 'admin@demo.com',
        role: 'Admin'
      };
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    
    await dbConnect();
    const user = await User.findById(decoded.id);

    if (!user) {
      return null;
    }

    return user;
  } catch (err) {
    return null;
  }
}

export function authorize(...roles: string[]) {
  return (user: any) => {
    if (!user || !roles.includes(user.role)) {
      return false;
    }
    return true;
  };
}

export const sendTokenResponse = (user: any) => {
  const token = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: '30d'
  });

  return {
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};
