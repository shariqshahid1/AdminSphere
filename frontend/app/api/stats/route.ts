import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: Request) {
  const userId = await getUserFromRequest(req);

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const stats = [
    { month: 'Jan', revenue: 18400, orders: 142, users: 89 },
    { month: 'Feb', revenue: 22100, orders: 167, users: 112 },
    { month: 'Mar', revenue: 19800, orders: 155, users: 98 },
    { month: 'Apr', revenue: 24500, orders: 189, users: 134 },
    { month: 'May', revenue: 28300, orders: 210, users: 156 },
    { month: 'Jun', revenue: 26700, orders: 198, users: 143 },
    { month: 'Jul', revenue: 31200, orders: 234, users: 178 },
  ];

  return NextResponse.json(stats);
}
