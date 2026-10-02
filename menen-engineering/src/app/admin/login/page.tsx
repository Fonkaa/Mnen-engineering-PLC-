'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, ShieldAlert, ArrowRight, ArrowLeft } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (email.trim() === 'habtamuengr@gmail.com' && password === 'MenenAdmin2026!') {
      localStorage.setItem('menen_admin_auth', 'authenticated');
      router.push('/admin/dashboard');
    } else {
      setErrorMsg('Invalid administrative credentials. Access denied.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[var(--theme-card)] border border-[var(--theme-border)] p-8 rounded-2xl shadow-2xl relative">
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Main Site
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full border border-[var(--theme-accent)]/50 bg-[var(--theme-surface)] flex items-center justify-center mx-auto mb-3 text-[var(--theme-accent)]">
            <Lock className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--theme-accent)] font-semibold">
            Executive Security Gateway
          </span>
          <h1 className="text-2xl font-bold text-[var(--theme-text-primary)] mt-1">
            MENEN Administration
          </h1>
          <p className="text-xs text-[var(--theme-text-muted)] mt-1 font-mono">
            Direct Dynamic Content & Masterplan Management
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1">
              Authorized Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="habtamuengr@gmail.com"
              className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3.5 py-2.5 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)] font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1">
              Secret Passkey
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3.5 py-2.5 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)] font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-[var(--theme-accent)] text-black font-bold font-mono text-xs uppercase tracking-wider hover:opacity-90 transition mt-2 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            {loading ? 'Authenticating...' : 'Enter Console'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[var(--theme-border)] text-center text-[10px] text-[var(--theme-text-muted)] font-mono">
          Default Master Admin: <span className="text-[var(--theme-accent)]">habtamuengr@gmail.com</span> / <span className="text-[var(--theme-accent)]">MenenAdmin2026!</span>
        </div>
      </div>
    </div>
  );
}
