'use client';

import { Bell, Search, Command, LogOut, User as UserIcon, Menu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';

const notifications = [
  {
    id: 1,
    title: 'New order received',
    desc: 'Hamza Tariq placed an order for Rs 4,85,000',
    time: '2m ago',
    unread: true,
    type: 'order',
  },
  {
    id: 2,
    title: 'Server deployment done',
    desc: 'v2.4.1 pushed to production successfully',
    time: '18m ago',
    unread: true,
    type: 'system',
  },
  {
    id: 3,
    title: 'Ayesha joined the team',
    desc: 'New team member added as Editor',
    time: '1h ago',
    unread: false,
    type: 'team',
  },
  {
    id: 4,
    title: 'Weekly report ready',
    desc: 'Your analytics summary for this week is available',
    time: '3h ago',
    unread: false,
    type: 'report',
  },
];

const typeColors: Record<string, string> = {
  order: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400',
  system: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
  team: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
  report: 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

export default function Navbar({ onMenuToggle }: { onMenuToggle?: () => void }) {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="h-14 sm:h-16 bg-white/80 dark:bg-[#1a1a2e]/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800/60 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10">
      {/* left side: hamburger + search */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* mobile menu button */}
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/[0.04] transition-colors text-gray-500 dark:text-gray-400 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* search - hidden on very small screens */}
        <div className="relative w-full max-w-sm hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            className="w-full pl-10 pr-12 py-2 text-[13px] bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-gray-800 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            placeholder="Search anything..."
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-0.5 text-[10px] text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-1.5 py-0.5 font-mono">
            <Command size={10} /> K
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* mobile search */}
        <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/[0.04] transition-colors text-gray-500 dark:text-gray-400 sm:hidden">
          <Search className="w-5 h-5" />
        </button>

        <ThemeToggle />

        {/* notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/[0.04] transition-colors relative text-gray-500 dark:text-gray-400"
          >
            <Bell className="w-[18px] h-[18px]" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center border-2 border-white dark:border-[#1a1a2e]">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-[340px] bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-xl shadow-black/5 dark:shadow-black/30 border border-gray-100 dark:border-gray-800/80 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800/80 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900 dark:text-white">Notifications</span>
                {unreadCount > 0 && (
                  <button className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer border-b border-gray-50 dark:border-gray-800/50 last:border-0"
                  >
                    <div className="flex gap-3">
                      <div className={`p-2 rounded-xl h-fit ${typeColors[n.type]}`}>
                        <Bell size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-[13px] font-semibold text-gray-900 dark:text-white truncate">
                            {n.title}
                          </p>
                          {n.unread && (
                            <span className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0 mt-1.5" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                          {n.desc}
                        </p>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 block">
                          {n.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-gray-100 dark:border-gray-800/80">
                <button className="w-full text-center text-xs text-gray-500 font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* profile dropdown */}
        <div className="pl-2 sm:pl-3 border-l border-gray-200 dark:border-gray-800/60 ml-0.5 sm:ml-1 relative" ref={profileRef}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center hover:ring-2 hover:ring-indigo-500/30 transition-all"
          >
            <UserIcon size={15} className="text-white" />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-xl shadow-black/5 dark:shadow-black/30 border border-gray-100 dark:border-gray-800/80 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800/80">
                <p className="text-[13px] font-semibold text-gray-900 dark:text-white">
                  {user?.name || 'Unknown'}
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                  {user?.email || ''}
                </p>
              </div>
              <div className="p-1.5">
                <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors">
                  <UserIcon size={15} />
                  Profile
                </button>
                <button
                  onClick={() => logout()}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                >
                  <LogOut size={15} />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
