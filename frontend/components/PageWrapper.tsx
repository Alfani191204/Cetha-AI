"use client";

import React from "react";

export default function PageWrapper({ 
  children 
}: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 flex justify-center bg-[var(--bg)] transition-colors">
      <div className="relative w-full max-w-[430px] h-full flex flex-col overflow-hidden bg-[var(--bg)] transition-colors">
        <div className="flex-1 overflow-y-auto pb-20 px-6 scrollbar-none">
          {children}
        </div>
      </div>
    </div>
  )
}
