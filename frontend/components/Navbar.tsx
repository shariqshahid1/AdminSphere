'use client';

import { Bell, Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useState, useRef, useEffect } from 'react';
import { UserButton } from '@clerk/nextjs';

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        
        {/* Notifications Dropdown */}
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative text-gray-600 dark:text-gray-400"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                <span className="font-bold text-sm">Notifications</span>
                <button className="text-xs text-blue-600 font-medium">Mark all as read</button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <div className="flex gap-3">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-500 h-fit">
                      <Bell size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-semibold">Welcome to Clerk</p>
                        <span className="text-[10px] text-gray-400">Just now</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">Authentication is now managed by Clerk.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-2 text-center border-t border-gray-200 dark:border-gray-800">
                <button className="text-xs text-gray-500 font-medium hover:text-blue-600">View all notifications</button>
              </div>
            </div>
          )}
        </div>
        
        <div className="pl-4 border-l border-gray-200 dark:border-gray-800">
          <UserButton />
        </div>
      </div>
    </header>
  );
}
