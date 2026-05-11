'use client';

import { User, Bell, Shield, Moon, Globe, Save, Lock, Eye, BellRing, Smartphone, Mail, Laptop } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your account and application preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-64 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-2 h-fit">
          {[
            { id: 'profile', icon: User, label: 'Profile' },
            { id: 'notifications', icon: Bell, label: 'Notifications' },
            { id: 'security', icon: Shield, label: 'Security' },
            { id: 'display', icon: Moon, label: 'Display' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id 
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 lg:p-8">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold">Profile Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Display Name</label>
                  <input type="text" className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent" placeholder="Demo Admin" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                  <input type="email" className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent" placeholder="admin@demo.com" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Biography</label>
                <textarea className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent h-24" placeholder="Tell us about yourself..."></textarea>
              </div>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                <Save size={18} />
                Save Changes
              </button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: 'Email Notifications', desc: 'Receive updates via email about account activity.' },
                  { icon: Smartphone, label: 'Push Notifications', desc: 'Get real-time alerts on your desktop or mobile.' },
                  { icon: BellRing, label: 'System Alerts', desc: 'Important notices regarding system maintenance.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                    <div className="flex gap-4">
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg h-fit">
                        <item.icon size={20} className="text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold">Security Settings</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Lock size={20} className="text-blue-600" />
                    <span className="font-semibold text-sm">Change Password</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="password" placeholder="Current Password" className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm" />
                    <input type="password" placeholder="New Password" className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm" />
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Update Password</button>
                </div>
                
                <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg h-fit">
                      <Shield size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Two-Factor Authentication</p>
                      <p className="text-xs text-gray-500">Add an extra layer of security to your account.</p>
                    </div>
                  </div>
                  <button className="text-blue-600 text-sm font-bold">Enable</button>
                </div>

                <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg h-fit">
                      <Laptop size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Active Sessions</p>
                      <p className="text-xs text-gray-500">You are currently logged in on 2 devices.</p>
                    </div>
                  </div>
                  <button className="text-gray-500 text-sm font-medium flex items-center gap-1">
                    <Eye size={16} />
                    View All
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'display' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold">Display Preferences</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-900/10">
                    <div className="flex items-center gap-3 mb-4">
                      <Globe size={20} className="text-blue-600" />
                      <span className="font-semibold text-sm">Language</span>
                    </div>
                    <select className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
                      <option>English (US)</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3 mb-4">
                      <Moon size={20} className="text-gray-600" />
                      <span className="font-semibold text-sm">Appearance</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 px-3 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-medium bg-white dark:bg-gray-800">Light</button>
                      <button className="flex-1 py-2 px-3 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-medium bg-gray-900 text-white">Dark</button>
                      <button className="flex-1 py-2 px-3 rounded-lg border border-blue-600 text-blue-600 text-xs font-medium">System</button>
                    </div>
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
