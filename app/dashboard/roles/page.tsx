'use client';

import { Shield, Lock, Eye, Pencil, BarChart3, CreditCard, Users, Settings, FileText, Check } from 'lucide-react';

const roles = [
  {
    name: 'Admin',
    description: 'God mode. Can do everything — manage users, billing, deploy, and nuke the whole thing if they want.',
    users: ['Ahmed Raza', 'Ayesha Khan'],
    color: 'from-purple-500 to-indigo-600',
    bgLight: 'bg-purple-50 dark:bg-purple-900/10',
    textColor: 'text-purple-700 dark:text-purple-400',
  },
  {
    name: 'Manager',
    description: 'Can view analytics, manage team members, and handle orders. No billing or system-level changes.',
    users: ['Sana Malik', 'Fatima Noor'],
    color: 'from-blue-500 to-cyan-500',
    bgLight: 'bg-blue-50 dark:bg-blue-900/10',
    textColor: 'text-blue-700 dark:text-blue-400',
  },
  {
    name: 'Editor',
    description: 'Can edit content, products, and blog posts. Read-only access for analytics and orders.',
    users: ['Hassan Javed', 'Bilal Siddiqui'],
    color: 'from-emerald-500 to-teal-500',
    bgLight: 'bg-emerald-50 dark:bg-emerald-900/10',
    textColor: 'text-emerald-700 dark:text-emerald-400',
  },
];

const permissions = [
  { name: 'View dashboard', icon: Eye, admin: true, manager: true, editor: true },
  { name: 'Manage team members', icon: Users, admin: true, manager: true, editor: false },
  { name: 'Edit content & products', icon: Pencil, admin: true, manager: false, editor: true },
  { name: 'View analytics', icon: BarChart3, admin: true, manager: true, editor: true },
  { name: 'Manage orders', icon: FileText, admin: true, manager: true, editor: false },
  { name: 'Billing & subscriptions', icon: CreditCard, admin: true, manager: false, editor: false },
  { name: 'System settings', icon: Settings, admin: true, manager: false, editor: false },
  { name: 'Deploy & CI/CD', icon: Lock, admin: true, manager: false, editor: false },
];

export default function RolesPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Roles & Permissions
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Control what each role can access across the platform.
        </p>
      </div>

      {/* role cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {roles.map((role) => (
          <div
            key={role.name}
            className="card-hover bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-100 dark:border-gray-800/80 overflow-hidden"
          >
            {/* color strip */}
            <div className={`h-1.5 bg-gradient-to-r ${role.color}`} />

            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-xl ${role.bgLight}`}>
                  <Shield size={18} className={role.textColor} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{role.name}</h3>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500">
                    {role.users.length} member{role.users.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                {role.description}
              </p>

              {/* member avatars */}
              <div className="flex items-center gap-2">
                {role.users.map((name) => (
                  <div
                    key={name}
                    className="group relative"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-white/[0.06] flex items-center justify-center text-[10px] font-bold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                      {name.split(' ').map(w => w[0]).join('')}
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-[10px] rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* permissions matrix */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-100 dark:border-gray-800/80 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800/80">
          <h3 className="font-bold text-gray-900 dark:text-white">Permission Matrix</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Who can do what — a quick reference.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-semibold">
              <tr>
                <th className="px-6 py-3.5">Permission</th>
                <th className="px-6 py-3.5 text-center">Admin</th>
                <th className="px-6 py-3.5 text-center">Manager</th>
                <th className="px-6 py-3.5 text-center">Editor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {permissions.map((perm) => (
                <tr
                  key={perm.name}
                  className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2.5">
                      <perm.icon size={15} className="text-gray-400" />
                      <span className="text-[13px] font-medium text-gray-700 dark:text-gray-300">
                        {perm.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-center">
                    {perm.admin ? (
                      <Check size={16} className="inline text-emerald-500" />
                    ) : (
                      <span className="inline-block w-4 h-px bg-gray-200 dark:bg-gray-700" />
                    )}
                  </td>
                  <td className="px-6 py-3 text-center">
                    {perm.manager ? (
                      <Check size={16} className="inline text-emerald-500" />
                    ) : (
                      <span className="inline-block w-4 h-px bg-gray-200 dark:bg-gray-700" />
                    )}
                  </td>
                  <td className="px-6 py-3 text-center">
                    {perm.editor ? (
                      <Check size={16} className="inline text-emerald-500" />
                    ) : (
                      <span className="inline-block w-4 h-px bg-gray-200 dark:bg-gray-700" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
