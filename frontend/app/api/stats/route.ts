import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // This is where you would fetch data from your database
  // For now, we'll return mock data
  const stats = [
    { name: 'Jan', revenue: 4000, users: 2400, orders: 2400 },
    { name: 'Feb', revenue: 3000, users: 1398, orders: 2210 },
    { name: 'Mar', revenue: 2000, users: 9800, orders: 2290 },
    { name: 'Apr', revenue: 2780, users: 3908, orders: 2000 },
    { name: 'May', revenue: 1890, users: 4800, orders: 2181 },
    { name: 'Jun', revenue: 2390, users: 3800, orders: 2500 },
    { name: 'Jul', revenue: 3490, users: 4300, orders: 2100 },
  ];

  return NextResponse.json(stats);
}
