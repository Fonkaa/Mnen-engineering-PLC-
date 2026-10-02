'use client';

import React from 'react';
import Link from 'next/link';
import { KeyRound } from 'lucide-react';

export default function SecretAdminTrigger() {
  return (
    <div className="fixed bottom-3 right-3 z-40 opacity-20 hover:opacity-100 transition-opacity duration-300">
      <Link
        href="/admin/login"
        aria-label="Staff Access Portal"
        title="Admin Portal"
        className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900/60 text-slate-400 hover:text-amber-400 hover:bg-slate-900 transition-all border border-slate-700/40 shadow-sm"
      >
        <KeyRound className="w-4 h-4" />
      </Link>
    </div>
  );
}