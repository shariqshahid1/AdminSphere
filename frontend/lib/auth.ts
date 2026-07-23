import { SignJWT, jwtVerify } from 'jose';
import { hash, compare } from 'bcryptjs';

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'super-secret-key-change-in-prod-pls'
);

export async function hashPassword(pw: string) {
  return hash(pw, 12);
}

export async function verifyPassword(pw: string, hashed: string) {
  return compare(pw, hashed);
}

export async function createToken(payload: Record<string, unknown>) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch {
    return null;
  }
}

// helper: grab user id from cookie in request headers
export async function getUserFromRequest(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  const match = cookie.match(/token=([^;]+)/);
  if (!match) return null;

  const payload = await verifyToken(match[1]);
  if (!payload || !payload.userId) return null;

  return payload.userId as string;
}
