'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Mon', visits: 4000, orders: 2400 },
  { name: 'Tue', visits: 3000, orders: 1398 },
  { name: 'Wed', visits: 2000, orders: 9800 },
  { name: 'Thu', visits: 2780, orders: 3908 },
  { name: 'Fri', visits: 1890, orders: 4800 },
  { name: 'Sat', visits: 2390, orders: 3800 },
  { name: 'Sun', visits: 3490, orders: 4300 },
];

const pieData = [
  { name: 'Direct', value: 400 },
  { name: 'Social', value: 300 },
  { name: 'Referral', value: 300 },
  { name: 'Others', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setMounted(true));
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Deep dive into your performance metrics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-100 dark:border-gray-800/80">
          <h3 className="font-bold text-gray-900 dark:text-white mb-6">Traffic Sources</h3>
          <div className="h-80">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value">
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      fontSize: '13px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-100 dark:border-gray-800/80">
          <h3 className="font-bold text-gray-900 dark:text-white mb-6">Weekly Activity</h3>
          <div className="h-80">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      fontSize: '13px',
                    }}
                  />
                  <Line type="monotone" dataKey="visits" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="orders" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
