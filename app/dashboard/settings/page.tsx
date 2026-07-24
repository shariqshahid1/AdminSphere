'use client';

import {
  User,
  Bell,
  Shield,
  Moon,
  Globe,
  Save,
  Lock,
  Eye,
  BellRing,
  Smartphone,
  Mail,
  Laptop,
  Trash2,
  Camera,
  Key,
  Check,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';

const tabs = [
  { id: 'profile', icon: User, label: 'Profile' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'security', icon: Shield, label: 'Security' },
  { id: 'display', icon: Moon, label: 'Display' },
];

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [saveMsg, setSaveMsg] = useState('');
  const [notifSettings, setNotifSettings] = useState({
    email: true,
    push: true,
    system: true,
    marketing: false,
  });

  const handleSave = () => {
    setSaveMsg('Changes saved successfully!');
    setTimeout(() => setSaveMsg(''), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Manage your account and preferences.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* tabs */}
        <div className="w-full lg:w-56 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[0.04]'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* content */}
        <div className="flex-1 bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-100 dark:border-gray-800/80 overflow-hidden">
          {activeTab === 'profile' && (
            <div className="p-6 lg:p-8 space-y-6">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Profile</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Your personal information and public profile.
                </p>
              </div>

              {/* avatar */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <User size={28} className="text-white" />
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:text-indigo-600 transition-colors shadow-sm">
                    <Camera size={13} />
                  </button>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name || 'Unknown'}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || ''}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Display name
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.name || ''}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/[0.04] text-[13px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email || ''}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/[0.04] text-[13px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Job title
                  </label>
                  <input
                    type="text"
                    defaultValue="Lead Engineer"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/[0.04] text-[13px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Department
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.department || 'General'}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/[0.04] text-[13px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Bio
                </label>
                <textarea
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/[0.04] text-[13px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all h-20 resize-none"
                  defaultValue="Building things on the web since 2018. Mostly TypeScript, some Rust, and a lot of coffee."
                />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 dark:shadow-none"
                >
                  <Save size={15} />
                  Save changes
                </button>
                {saveMsg && (
                  <span className="text-[13px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-medium">
                    <Check size={14} />
                    {saveMsg}
                  </span>
                )}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="p-6 lg:p-8 space-y-6">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Notifications</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Choose how and when you get notified.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { key: 'email' as const, icon: Mail, label: 'Email notifications', desc: 'Order updates, weekly reports, and security alerts.' },
                  { key: 'push' as const, icon: Smartphone, label: 'Push notifications', desc: 'Real-time alerts on your phone via the mobile app.' },
                  { key: 'system' as const, icon: BellRing, label: 'System alerts', desc: 'Server issues, downtime, and deployment status.' },
                  { key: 'marketing' as const, icon: Mail, label: 'Marketing emails', desc: 'Product updates, feature announcements, and tips.' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-gray-100 dark:border-gray-800/80 hover:border-gray-200 dark:hover:border-gray-700 transition-colors"
                  >
                    <div className="flex gap-3.5">
                      <div className="p-2 bg-gray-50 dark:bg-white/[0.04] rounded-xl h-fit">
                        <item.icon size={17} className="text-gray-500 dark:text-gray-400" />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-gray-900 dark:text-white">
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifSettings[item.key]}
                        onChange={(e) => setNotifSettings({ ...notifSettings, [item.key]: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-[22px] bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300/30 dark:peer-focus:ring-indigo-800/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-[18px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[18px] after:w-[18px] after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600" />
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 dark:shadow-none"
                >
                  <Save size={15} />
                  Save preferences
                </button>
                {saveMsg && (
                  <span className="text-[13px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-medium">
                    <Check size={14} />
                    {saveMsg}
                  </span>
                )}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="p-6 lg:p-8 space-y-6">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Security</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Keep your account safe and secure.
                </p>
              </div>

              {/* password */}
              <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800/80 space-y-4">
                <div className="flex items-center gap-2.5">
                  <Lock size={16} className="text-indigo-500" />
                  <span className="text-[13px] font-semibold text-gray-900 dark:text-white">
                    Change password
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="password"
                    placeholder="Current password"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/[0.04] text-[13px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/[0.04] text-[13px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-[13px] font-semibold hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 dark:shadow-none">
                  Update password
                </button>
              </div>

              {/* 2fa */}
              <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex gap-3.5">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-900/15 rounded-xl h-fit">
                    <Key size={17} className="text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-gray-900 dark:text-white">
                      Two-factor authentication
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Extra security layer. Requires your phone to sign in.
                    </p>
                  </div>
                </div>
                <button className="text-[13px] text-indigo-600 dark:text-indigo-400 font-semibold hover:underline whitespace-nowrap">
                  Enable 2FA
                </button>
              </div>

              {/* sessions */}
              <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex gap-3.5">
                  <div className="p-2 bg-gray-50 dark:bg-white/[0.04] rounded-xl h-fit">
                    <Laptop size={17} className="text-gray-500 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-gray-900 dark:text-white">
                      Active sessions
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      You&apos;re signed in on 2 devices right now.
                    </p>
                  </div>
                </div>
                <button className="text-[13px] text-gray-500 font-medium flex items-center gap-1.5 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                  <Eye size={14} />
                  View all
                </button>
              </div>

              {/* danger zone */}
              <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-[13px] font-semibold text-red-700 dark:text-red-400">
                      Delete account
                    </p>
                    <p className="text-xs text-red-500/70 dark:text-red-400/60 mt-0.5">
                      Permanently remove your account and all associated data.
                    </p>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-300 dark:border-red-800 text-[12px] font-semibold text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors">
                    <Trash2 size={13} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'display' && (
            <div className="p-6 lg:p-8 space-y-6">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Display</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Customize how the app looks and feels.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* language */}
                <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800/80">
                  <div className="flex items-center gap-2.5 mb-3">
                    <Globe size={16} className="text-gray-500 dark:text-gray-400" />
                    <span className="text-[13px] font-semibold text-gray-900 dark:text-white">
                      Language
                    </span>
                  </div>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/[0.04] text-[13px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all">
                    <option>English (US)</option>
                    <option>Urdu</option>
                    <option>Arabic</option>
                    <option>Turkish</option>
                  </select>
                </div>

                {/* timezone */}
                <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800/80">
                  <div className="flex items-center gap-2.5 mb-3">
                    <Globe size={16} className="text-gray-500 dark:text-gray-400" />
                    <span className="text-[13px] font-semibold text-gray-900 dark:text-white">
                      Timezone
                    </span>
                  </div>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/[0.04] text-[13px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all">
                    <option>Asia/Karachi (PKT, UTC+5)</option>
                    <option>America/New_York (EST, UTC-5)</option>
                    <option>Europe/London (GMT, UTC+0)</option>
                    <option>Asia/Dubai (GST, UTC+4)</option>
                  </select>
                </div>

                {/* theme */}
                <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800/80">
                  <div className="flex items-center gap-2.5 mb-3">
                    <Moon size={16} className="text-gray-500 dark:text-gray-400" />
                    <span className="text-[13px] font-semibold text-gray-900 dark:text-white">
                      Theme
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2.5 px-3 rounded-xl border border-gray-200 dark:border-gray-700 text-[12px] font-semibold bg-white dark:bg-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                      Light
                    </button>
                    <button className="flex-1 py-2.5 px-3 rounded-xl border border-indigo-500 text-[12px] font-semibold text-indigo-600 dark:text-indigo-400">
                      Dark
                    </button>
                    <button className="flex-1 py-2.5 px-3 rounded-xl border border-gray-200 dark:border-gray-700 text-[12px] font-semibold bg-white dark:bg-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                      System
                    </button>
                  </div>
                </div>

                {/* font size */}
                <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800/80">
                  <div className="flex items-center gap-2.5 mb-3">
                    <Eye size={16} className="text-gray-500 dark:text-gray-400" />
                    <span className="text-[13px] font-semibold text-gray-900 dark:text-white">
                      Sidebar
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2.5 px-3 rounded-xl border border-indigo-500 text-[12px] font-semibold text-indigo-600 dark:text-indigo-400">
                      Expanded
                    </button>
                    <button className="flex-1 py-2.5 px-3 rounded-xl border border-gray-200 dark:border-gray-700 text-[12px] font-semibold bg-white dark:bg-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                      Collapsed
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
