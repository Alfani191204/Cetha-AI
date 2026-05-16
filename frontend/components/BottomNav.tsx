"use client";

import { Home, Camera, Lightbulb, Package, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";

export function BottomNav() {
  const pathname = usePathname();
  const t = useLang();

  const NAV_ITEMS = [
    { icon: Home, label: t.dashboard, href: "/" },
    { icon: Camera, label: t.scan, href: "/scan" },
    { icon: Lightbulb, label: t.insight, href: "/insight" },
    { icon: Package, label: t.stock, href: "/inventory" },
    { icon: User, label: t.profile, href: "/profile" }
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50">
      <div className="relative bg-[var(--primary)] h-14 rounded-t-2xl flex justify-around items-center px-1 pb-1 shadow-[0_-4px_15px_rgba(0,0,0,0.15)] overflow-visible">
        {NAV_ITEMS.map((item, index) => {
          // Strictly exact match for dashboard, startswith for others
          const isActive = item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link 
              key={index} 
              href={item.href} 
              className="flex flex-col items-center justify-center pt-1 pb-1 gap-0 w-full h-full"
            >
              <div className={`flex items-center justify-center w-10 h-10 ${isActive ? '-translate-y-2' : ''} transition-transform z-10`}>
                {isActive ? (
                  <div className="w-10 h-10 bg-[var(--card)] rounded-full flex items-center justify-center border-[4px] border-[var(--bg)] shadow-sm">
                    <Icon className="w-4 h-4 text-[var(--primary)]" />
                  </div>
                ) : (
                  <Icon className="w-5 h-5 text-[var(--border)] transition-colors hover:text-white" />
                )}
              </div>
              
              <span className={`text-[9px] mt-0 font-bold ${isActive ? 'text-white' : 'text-[var(--border)]'} transition-all z-10`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
