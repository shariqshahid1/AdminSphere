'use client';

import { Shield } from 'lucide-react';

const roles = [
  { 
    name: 'Admin', 
    description: 'Full access to all settings and user management.',
    users: 3,
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30'
  },
  { 
    name: 'Manager', 
    description: 'Can view analytics and manage orders, but cannot delete users.',
    users: 12,
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30'
  },
  { 
    name: 'Editor', 
    description: 'Can edit content and products, but no access to billing.',
    users: 5,
    color: 'bg-green-100 text-green-700 dark:bg-green-900/30'
  }
];

export default function RolesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Role Management</h1>
        <p className="text-gray-500 dark:text-gray-400">Define and manage access levels for your team.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div key={role.name} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${role.color}`}>
                {role.name}
              </div>
              <Shield className="text-gray-400" size={20} />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{role.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">{role.users} active users</span>
              <button className="text-blue-600 font-medium hover:underline">Edit Permissions</button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden mt-8">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h3 className="font-bold text-lg">System Permissions</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {['View Dashboard', 'Manage Users', 'Export Reports', 'Billing Access'].map((perm) => (
              <div key={perm} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                <span className="font-medium">{perm}</span>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked readOnly className="rounded text-blue-600" />
                    <span className="text-xs text-gray-500">Admin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={perm !== 'Manage Users'} readOnly className="rounded text-blue-600" />
                    <span className="text-xs text-gray-500">Manager</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
