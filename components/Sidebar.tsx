'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  ShieldCheck,
  Hexagon,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth-context';

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: Users, label: 'Team', href: '/dashboard/users' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: ShieldCheck, label: 'Roles', href: '/dashboard/roles' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div
      className={cn(
        "h-screen bg-white dark:bg-[#1a1a2e] border-r border-gray-100 dark:border-gray-800/60 transition-all duration-300 flex flex-col relative shrink-0",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* logo area */}
      <div className={cn(
        "h-16 flex items-center border-b border-gray-100 dark:border-gray-800/60 px-4",
        collapsed ? "justify-center" : "gap-3"
      )}>
        <div
          className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 cursor-pointer select-none"
          onClick={() => router.push('/dashboard')}
        >
          <Hexagon size={18} className="text-white" strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-bold text-[15px] tracking-tight text-gray-900 dark:text-white">
              Admin Panel
            </span>
            <span className="text-[10px] text-gray-400 dark:text-gray-500 -mt-0.5 font-medium">
              management console
            </span>
          </div>
        )}
      </div>

      {/* nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150",
                isActive
                  ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[0.04] hover:text-gray-900 dark:hover:text-gray-200",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon size={19} strokeWidth={isActive ? 2.2 : 1.8} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 shadow-sm transition-colors z-10"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* bottom */}
      <div className="p-3 border-t border-gray-100 dark:border-gray-800/60">
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-[13px] font-medium text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 dark:hover:text-red-400 transition-all duration-150",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut size={19} strokeWidth={1.8} />
          {!collapsed && <span>Sign out</span>}
        </button>
        {!collapsed && (
          <div className="mt-2 px-3">
            <p className="text-[10px] text-gray-300 dark:text-gray-600 font-mono">v0.9.2-beta</p>
          </div>
        )}
      </div>
    </div>
  );
}
