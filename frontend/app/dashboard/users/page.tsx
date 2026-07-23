'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit2,
  Trash2,
  X,
  Shield,
  User as UserIcon,
  AlertCircle,
  Building2,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth-context';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Editor';
  status: 'active' | 'away' | 'offline';
  department: string;
  joinedAt: string;
  lastActive: string;
  password?: string;
}

const roleStyles: Record<string, string> = {
  Admin: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
  Manager: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
  Editor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
};

const statusDot: Record<string, string> = {
  active: 'bg-emerald-500',
  away: 'bg-amber-400',
  offline: 'bg-gray-300 dark:bg-gray-600',
};

const avatarColors = [
  'bg-indigo-500',
  'bg-rose-500',
  'bg-amber-500',
  'bg-emerald-500',
  'bg-cyan-500',
  'bg-violet-500',
];

function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

export default function UsersPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Partial<User> | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/users');
      if (response.data && response.data.data) {
        setUsers(response.data.data);
      }
    } catch {
      console.warn('API not reached, using mock data');
      const mockUsers: User[] = [
        {
          _id: '1',
          name: 'Ahmed Raza',
          email: 'ahmed@admin.io',
          role: 'Admin',
          status: 'active',
          department: 'Engineering',
          joinedAt: '2023-03-15T00:00:00.000Z',
          lastActive: '2 min ago',
        },
        {
          _id: '2',
          name: 'Sana Malik',
          email: 'sana@admin.io',
          role: 'Manager',
          status: 'active',
          department: 'Product',
          joinedAt: '2023-06-22T00:00:00.000Z',
          lastActive: '15 min ago',
        },
        {
          _id: '3',
          name: 'Hassan Javed',
          email: 'hassan@admin.io',
          role: 'Editor',
          status: 'away',
          department: 'Design',
          joinedAt: '2023-09-01T00:00:00.000Z',
          lastActive: '2 hours ago',
        },
        {
          _id: '4',
          name: 'Fatima Noor',
          email: 'fatima@admin.io',
          role: 'Manager',
          status: 'active',
          department: 'Marketing',
          joinedAt: '2024-01-10T00:00:00.000Z',
          lastActive: 'Just now',
        },
      ];
      setUsers(mockUsers);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, []);

  const handleOpenModal = (user: User | null = null) => {
    setCurrentUser(
      user || {
        name: '',
        email: '',
        role: 'Editor',
        department: '',
        status: 'active',
      }
    );
    setIsModalOpen(true);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');

    try {
      if (currentUser?._id) {
        await axios.put(`/api/users/${currentUser._id}`, currentUser);
      } else {
        await axios.post('/api/users', currentUser);
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Something went wrong');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this team member? This cannot be undone.')) return;
    try {
      await axios.delete(`/api/users/${id}`);
    } catch {
      // ignore
    }
    fetchUsers();
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || user.role === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Team Members
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {users.length} people across your organization.
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-colors shadow-sm shadow-indigo-200 dark:shadow-none"
          >
            <Plus size={16} strokeWidth={2.5} />
            Add member
          </button>
        )}
      </div>

      {/* filters + search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center gap-1.5 bg-white dark:bg-[#1a1a2e] border border-gray-100 dark:border-gray-800/80 rounded-xl p-1">
          {['all', 'Admin', 'Manager', 'Editor'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all',
                activeFilter === f
                  ? 'bg-gray-100 dark:bg-white/[0.08] text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              )}
            >
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            className="w-full pl-9 pr-3 py-2 text-[13px] bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-gray-800/80 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            placeholder="Search by name, email, dept..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* table */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-100 dark:border-gray-800/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-semibold">
              <tr>
                <th className="px-6 py-3.5">Member</th>
                <th className="px-6 py-3.5 hidden md:table-cell">Department</th>
                <th className="px-6 py-3.5">Role</th>
                <th className="px-6 py-3.5 hidden sm:table-cell">Status</th>
                <th className="px-6 py-3.5 hidden lg:table-cell">Last active</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex justify-center">
                      <div className="w-7 h-7 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <UserIcon size={32} className="text-gray-300 dark:text-gray-600" />
                      <p className="text-sm text-gray-500 font-medium">No members found</p>
                      <p className="text-xs text-gray-400">Try a different search or filter</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0',
                            getAvatarColor(user.name)
                          )}
                        >
                          <UserIcon size={16} className="text-white" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-gray-900 dark:text-white truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 hidden md:table-cell">
                      <div className="flex items-center gap-1.5 text-[13px] text-gray-500 dark:text-gray-400">
                        <Building2 size={13} />
                        {user.department}
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold',
                          roleStyles[user.role] || ''
                        )}
                      >
                        <Shield size={10} />
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 hidden sm:table-cell">
                      <div className="flex items-center gap-2 text-[13px]">
                        <span
                          className={cn(
                            'w-2 h-2 rounded-full flex-shrink-0',
                            statusDot[user.status]
                          )}
                        />
                        <span className="text-gray-500 dark:text-gray-400 capitalize">
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 hidden lg:table-cell">
                      <div className="flex items-center gap-1.5 text-[12px] text-gray-400 dark:text-gray-500">
                        <Clock size={12} />
                        {user.lastActive}
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <div className="flex justify-end gap-1">
                        {isAdmin && (
                          <>
                            <button
                              onClick={() => handleOpenModal(user)}
                              className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                            >
                              <Edit2 size={15} />
                            </button>
                            <button
                              onClick={() => handleDelete(user._id)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                              <Trash2 size={15} />
                            </button>
                          </>
                        )}
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-white/[0.04] rounded-lg transition-colors">
                          <MoreHorizontal size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 dark:border-gray-800/80 animate-fade-in-up">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800/80 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                {currentUser?._id ? 'Edit member' : 'Add new member'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/[0.06] rounded-lg transition-colors text-gray-400"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl text-[13px] flex items-center gap-2 border border-red-100 dark:border-red-800/50">
                  <AlertCircle size={15} />
                  {error}
                </div>
              )}
              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Full name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/[0.04] text-[13px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  placeholder="e.g. Ahmed Raza"
                  value={currentUser?.name || ''}
                  onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/[0.04] text-[13px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  placeholder="ahmed@admin.io"
                  value={currentUser?.email || ''}
                  onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Role
                  </label>
                  <select
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/[0.04] text-[13px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    value={currentUser?.role || 'Editor'}
                    onChange={(e) =>
                      setCurrentUser({
                        ...currentUser,
                        role: e.target.value as 'Admin' | 'Manager' | 'Editor',
                      })
                    }
                  >
                    <option value="Editor">Editor</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Department
                  </label>
                  <select
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/[0.04] text-[13px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    value={currentUser?.department || ''}
                    onChange={(e) =>
                      setCurrentUser({ ...currentUser, department: e.target.value })
                    }
                  >
                    <option value="">Select...</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>
              {!currentUser?._id && (
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/[0.04] text-[13px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    placeholder="Min. 8 characters"
                    onChange={(e) =>
                      setCurrentUser({ ...currentUser, password: e.target.value })
                    }
                  />
                </div>
              )}
              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-[13px] font-semibold hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] font-semibold disabled:opacity-50 transition-colors shadow-sm shadow-indigo-200 dark:shadow-none"
                >
                  {formLoading ? 'Saving...' : currentUser?._id ? 'Update' : 'Add member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
