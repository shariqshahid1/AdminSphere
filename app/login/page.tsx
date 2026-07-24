'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const result = await login(email, password);
    setSubmitting(false);

    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0f0f1a] p-4 relative overflow-hidden">
      {/* background pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/10 to-purple-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-purple-500/10 to-indigo-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/[0.03] rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        {/* branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              Admin Panel
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sign in to your admin account
          </p>
        </div>

        {/* form card */}
        <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-xl shadow-black/5 dark:shadow-black/30 border border-gray-100 dark:border-gray-800/80 p-6">
          {error && (
            <div className="mb-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl text-[13px] flex items-center gap-2 border border-red-100 dark:border-red-800/50">
              <AlertCircle size={15} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/[0.04] text-[13px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder-gray-400"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/[0.04] text-[13px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder-gray-400"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl text-[13px] font-semibold disabled:opacity-50 transition-colors shadow-sm shadow-indigo-200 dark:shadow-none"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800/80 text-center">
            <p className="text-[13px] text-gray-500 dark:text-gray-400">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30">
          <p className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 text-center mb-2.5 uppercase tracking-wider">
            Demo Accounts
          </p>
          <div className="space-y-1.5">
            {[
              { email: 'ahmed@admin.io', name: 'Ahmed Raza', role: 'Admin' },
              { email: 'sana@admin.io', name: 'Sana Malik', role: 'Manager' },
              { email: 'hassan@admin.io', name: 'Hassan Javed', role: 'Editor' },
              { email: 'fatima@admin.io', name: 'Fatima Noor', role: 'Manager' },
              { email: 'bilal@admin.io', name: 'Bilal Siddiqui', role: 'Editor' },
              { email: 'ayesha@admin.io', name: 'Ayesha Khan', role: 'Admin' },
            ].map((demo) => (
              <div key={demo.email} className="flex items-center justify-between text-[11px]">
                <span className="text-indigo-600 dark:text-indigo-400 font-mono">{demo.email}</span>
                <span className="text-gray-400 dark:text-gray-500 font-medium">{demo.role}</span>
              </div>
            ))}
            <p className="text-[11px] text-gray-400 dark:text-gray-500 text-center pt-1.5 border-t border-indigo-100 dark:border-indigo-900/30 mt-1.5">
              Password for all: <span className="font-mono font-semibold text-gray-500 dark:text-gray-400">password123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
