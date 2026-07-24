'use client';

import { useState, useEffect } from 'react';
import {
  Users,
  DollarSign,
  ShoppingCart,
  Clock,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Line
} from 'recharts';

const revenueData = [
  { name: 'Jan', revenue: 18400, target: 15000 },
  { name: 'Feb', revenue: 22100, target: 18000 },
  { name: 'Mar', revenue: 19800, target: 20000 },
  { name: 'Apr', revenue: 24500, target: 22000 },
  { name: 'May', revenue: 28300, target: 25000 },
  { name: 'Jun', revenue: 26700, target: 24000 },
  { name: 'Jul', revenue: 31200, target: 28000 },
];

const ordersData = [
  { name: 'Mon', orders: 42, returns: 3 },
  { name: 'Tue', orders: 58, returns: 5 },
  { name: 'Wed', orders: 65, returns: 2 },
  { name: 'Thu', orders: 47, returns: 4 },
  { name: 'Fri', orders: 73, returns: 6 },
  { name: 'Sat', orders: 89, returns: 8 },
  { name: 'Sun', orders: 34, returns: 1 },
];

const weeklyActivity = [
  { day: 'Mon', active: 234 },
  { day: 'Tue', active: 301 },
  { day: 'Wed', active: 287 },
  { day: 'Thu', active: 321 },
  { day: 'Fri', active: 298 },
  { day: 'Sat', active: 189 },
  { day: 'Sun', active: 142 },
];

const stats = [
  {
    title: 'Revenue',
    value: '$1,71,000',
    sub: 'this quarter',
    icon: DollarSign,
    change: '+12.5%',
    trend: 'up' as const,
    sparkline: [40, 35, 50, 45, 60, 55, 70],
  },
  {
    title: 'Customers',
    value: '2,847',
    sub: 'active this month',
    icon: Users,
    change: '+8.2%',
    trend: 'up' as const,
    sparkline: [20, 25, 22, 30, 28, 35, 40],
  },
  {
    title: 'Orders',
    value: '408',
    sub: 'this week',
    icon: ShoppingCart,
    change: '+23.1%',
    trend: 'up' as const,
    sparkline: [30, 40, 35, 50, 45, 60, 55],
  },
  {
    title: 'Avg. Session',
    value: '4m 32s',
    sub: 'per user',
    icon: Clock,
    change: '-2.4%',
    trend: 'down' as const,
    sparkline: [50, 45, 55, 42, 48, 40, 38],
  },
];

const recentOrders = [
  { id: '#3241', customer: 'Hamza Tariq', product: 'MacBook Pro 16"', amount: 'Rs 4,85,000', status: 'shipped' },
  { id: '#3240', customer: 'Ayesha Khan', product: 'iPhone 15 Pro Max', amount: 'Rs 2,89,000', status: 'delivered' },
  { id: '#3239', customer: 'Bilal Ahmed', product: 'AirPods Pro 2', amount: 'Rs 42,000', status: 'processing' },
  { id: '#3238', customer: 'Fatima Noor', product: 'iPad Air M2', amount: 'Rs 1,35,000', status: 'pending' },
  { id: '#3237', customer: 'Omar Sheikh', product: 'Samsung S24 Ultra', amount: 'Rs 2,59,000', status: 'delivered' },
];

const statusStyles: Record<string, string> = {
  shipped: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
  delivered: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
  processing: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
  pending: 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  return (
    <div className="flex items-end gap-[3px] h-8">
      {data.map((val, i) => (
        <div
          key={i}
          className="w-[5px] rounded-full transition-all duration-300"
          style={{
            height: `${((val - min) / range) * 100}%`,
            backgroundColor: color,
            opacity: i === data.length - 1 ? 1 : 0.4 + (i / data.length) * 0.6,
          }}
        />
      ))}
    </div>
  );
}

export default function DashboardHome() {
  const [mounted, setMounted] = useState(false);
  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  });

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setMounted(true);
      });
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {greeting || 'Dashboard'}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Here&apos;s what&apos;s going on with your business today.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
          All systems operational
        </div>
      </div>

      {/* stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="card-hover bg-white dark:bg-[#1a1a2e] p-5 rounded-2xl border border-gray-100 dark:border-gray-800/80 relative overflow-hidden"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                <stat.icon size={18} strokeWidth={2.2} />
              </div>
              <MiniSparkline
                data={stat.sparkline}
                color={stat.trend === 'up' ? '#22c55e' : '#ef4444'}
              />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {stat.value}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">{stat.sub}</span>
              </div>
            </div>
            <div className={`absolute bottom-0 left-0 right-0 h-[2px] ${
              stat.trend === 'up' ? 'bg-gradient-to-r from-emerald-500 to-emerald-300' : 'bg-gradient-to-r from-red-500 to-red-300'
            }`} />
          </div>
        ))}
      </div>

      {/* charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* revenue chart - takes 2 cols */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-100 dark:border-gray-800/80">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">Revenue vs Target</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Jan — Jul 2025</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                Revenue
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                Target
              </span>
            </div>
          </div>
          <div className="h-72 min-h-[288px]">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    dy={8}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      fontSize: '13px',
                    }}
                    formatter={(value) => [`Rs ${(Number(value) / 1000).toFixed(1)}k`, '']}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#revenueGrad)"
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#cbd5e1"
                    strokeWidth={1.5}
                    strokeDasharray="6 4"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* weekly activity */}
        <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-100 dark:border-gray-800/80">
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Weekly Activity</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">Unique users per day</p>
          <div className="h-72 min-h-[288px]">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <BarChart data={weeklyActivity} barCategoryGap="25%">
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    dy={8}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      fontSize: '13px',
                    }}
                    cursor={{ fill: 'rgba(99, 102, 241, 0.04)' }}
                  />
                  <Bar
                    dataKey="active"
                    fill="#6366f1"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* orders chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-100 dark:border-gray-800/80">
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Orders This Week</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">Orders vs returns</p>
          <div className="h-64 min-h-[256px]">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <BarChart data={ordersData} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    dy={8}
                  />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      fontSize: '13px',
                    }}
                    cursor={{ fill: 'rgba(99, 102, 241, 0.04)' }}
                  />
                  <Bar dataKey="orders" fill="#6366f1" radius={[5, 5, 0, 0]} />
                  <Bar dataKey="returns" fill="#fca5a5" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* recent orders table */}
        <div className="lg:col-span-3 bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-100 dark:border-gray-800/80 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800/80 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">Recent Orders</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Latest 5 transactions</p>
            </div>
            <button className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
              View all
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-semibold">
                <tr>
                  <th className="px-6 py-3 hidden sm:table-cell">Order</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3 hidden sm:table-cell">Product</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-3.5 text-sm font-mono text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                      {order.id}
                    </td>
                    <td className="px-6 py-3.5 text-sm font-medium text-gray-900 dark:text-white">
                      {order.customer}
                    </td>
                    <td className="px-6 py-3.5 text-sm text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                      {order.product}
                    </td>
                    <td className="px-6 py-3.5 text-sm font-medium text-gray-900 dark:text-white">
                      {order.amount}
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ${statusStyles[order.status] || ''}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
