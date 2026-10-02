'use client';

import React from 'react';
import Link from 'next/link';
import { KeyRound } from 'lucide-react';

export default function SecretAdminTrigger() {
  return (
    <div className="fixed bottom-5 right-5 z-[9999]">
      <Link
        href="/admin/login"
        aria-label="Corporate Staff Terminal"
        title="Admin Console Access"
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-[var(--theme-card)] text-[var(--theme-accent)] border border-[var(--theme-accent)] shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 group"
      >
        <KeyRound className="w-4 h-4 transform group-hover:rotate-45 transition-transform duration-300" />
        <span className="text-[11px] font-mono font-semibold tracking-wider">
          Admin Portal
        </span>
      </Link>
    </div>
  );
}