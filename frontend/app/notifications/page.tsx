"use client";

import PageWrapper from "@/components/PageWrapper";
import PageHeader from "@/components/PageHeader";
import { BottomNav } from "@/components/BottomNav";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Package, PieChart, TrendingUp, Camera, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function NotificationsPage() {
 const [notifications, setNotifications] = useState([
 {
 id: 1,
 group: "Hari ini",
 type: "STOK",
 title: "Peringatan Stok",
 desc: "Tepung terigu biasanya habis minggu ini! Segera restock.",
 time: "08.00",
 icon: <Package className="w-5 h-5 text-[#DC2626]" />,
 bg: "bg-[#FFF0F0]",
 unread: true
 },
 {
 id: 2,
 group: "Hari ini",
 type: "BUDGET",
 title: "Peringatan Budget",
 desc: "Pengeluaran bulan ini sudah 80% dari bulan lalu.",
 time: "07.30",
 icon: <PieChart className="w-5 h-5 text-[var(--secondary)]" />,
 bg: "bg-[#FEF3E2]",
 unread: true
 },
 {
 id: 3,
 group: "Kemarin",
 type: "INSIGHT",
 title: "Insight Laba",
 desc: "Laba bersih minggu ini naik 12%! Pertahankan!",
 time: "19.00",
 icon: <TrendingUp className="w-5 h-5 text-[#16A34A]" />,
 bg: "bg-[#F0FDF4]",
 unread: false
 },
 {
 id: 4,
 group: "Kemarin",
 type: "SCAN",
 title: "Aktivitas Scan",
 desc: "3 nota berhasil discan hari ini.",
 time: "15.22",
 icon: <Camera className="w-5 h-5 text-[var(--primary)]" />,
 bg: "bg-[#FFF5F3]",
 unread: false
 },
 {
 id: 5,
 group: "Minggu lalu",
 type: "ANOMALI",
 title: "Anomali Terdeteksi",
 desc: "Pengeluaran operasional tidak normal terdeteksi.",
 time: "Senin 09.15",
 icon: <AlertTriangle className="w-5 h-5 text-[#DC2626]" />,
 bg: "bg-[#FFF0F0]",
 unread: false
 }
 ]);

 const handleDismiss = (id: number) => {
 setNotifications(notifications.filter(n => n.id !== id));
 };

 const handleMarkAllRead = () => {
 setNotifications(notifications.map(n => ({ ...n, unread: false })));
 };

 const groupedNotifications = notifications.reduce((acc, curr) => {
 if (!acc[curr.group]) acc[curr.group] = [];
 acc[curr.group].push(curr);
 return acc;
 }, {} as Record<string, typeof notifications>);

 return (
 <PageWrapper>
  <div className="px-5  bg-[var(--bg)] text-[var(--text)] relative -hidden font-sans">
 {/* Header */}
 <PageHeader title="Notifikasi" />

 {/* Notification List */}
 <div className="px-4 mt-6 space-y-4">
 {Object.entries(groupedNotifications).map(([group, items]) => (
 <div key={group}>
 <h2 className="text-[11px] font-bold text-[var(--muted)] uppercase tracking-wider mb-3 px-2">
 {group}
 </h2>
 <div className="space-y-2">
 {items.map((item) => (
 <div 
 key={item.id} 
 onClick={() => handleDismiss(item.id)}
 className={`relative p-4 rounded-2xl flex gap-4 items-start transition-all cursor-pointer hover:bg-gray-50 ${
 item.unread ? 'bg-[var(--card)] shadow-sm border border-[var(--border)]' : 'bg-[var(--card)] shadow-sm opacity-70'
 }`}
 >
 <div className={`p-2.5 rounded-xl shrink-0 ${item.bg}`}>
 {item.icon}
 </div>
 <div className="flex-1 min-w-0 pr-10">
 <div className="flex items-center gap-2 mb-1">
 <span className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider">
 {item.type}
 </span>
 {item.unread && (
 <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]"></span>
 )}
 </div>
 {/* The prompt asked for bold title + desc abu */}
 <p className={`text-sm ${item.unread ? 'font-bold text-[var(--text)]' : 'font-bold text-[var(--text)]'}`}>
 {item.title}
 </p>
 <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">
 {item.desc}
 </p>
 </div>
 <span className="text-[10px] font-medium text-[var(--muted)] absolute top-4 right-4">
 {item.time}
 </span>
 </div>
 ))}
 </div>
 </div>
 ))}

 {notifications.length === 0 && (
 <div className="text-center py-20">
 <div className="w-16 h-16 bg-[var(--card)] shadow-sm border border-[var(--border)] rounded-full flex items-center justify-center mb-4">
 <CheckCircle2 className="w-8 h-8 text-[#16A34A]" />
 </div>
 <h3 className="text-[var(--text)] font-medium mb-1">Semua Selesai!</h3>
 <p className="text-sm text-[var(--muted)]">Tidak ada notifikasi baru untuk Anda.</p>
 </div>
 )}
 </div>
 <BottomNav />
 </div>
 </PageWrapper>
 );
}