"use client";

import { useRouter } from "next/navigation";

export default function PageHeader({ 
  title, subtitle 
}: { title: string, subtitle?: string }) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4 pt-10 pb-6 z-20 bg-[var(--bg)] sticky top-0">
      <button 
        onClick={() => router.back()}
        className="w-9 h-9 rounded-full bg-[var(--card)] shadow-sm flex items-center justify-center shrink-0 border border-[var(--border)] transition-colors hover:bg-gray-50 dark:hover:bg-[#3D1A2B]"
      >
        <svg className="w-4 h-4 text-[var(--primary)]" 
          fill="none" stroke="currentColor" 
          strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <div>
        <h1 className="text-xl font-bold text-[var(--text)] tracking-tight">{title}</h1>
        {subtitle && 
          <p className="text-sm text-[var(--muted)] mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}
