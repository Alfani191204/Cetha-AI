"use client";

import PageWrapper from "@/components/PageWrapper";
import PageHeader from "@/components/PageHeader";
import { BottomNav } from "@/components/BottomNav";
import { ChevronLeft, Calendar, AlertCircle, RefreshCw, Box } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/i18n";

export default function InventoryPage() {
 const router = useRouter();
 const t = useLang();

 return (
 <PageWrapper>
  <div className="px-5  bg-[var(--bg)] text-[var(--text)] font-sans shadow-xl ">
 {/* Header */}
 <PageHeader title="Saran Stok" subtitle="Rekomendasi berbasis data historis" />

 <main className=" mt-2 space-y-4">
 
 {/* SEASONAL CONTEXT BANNER */}
 <div className="bg-[#FEF3E2] border border-[var(--secondary)] rounded-2xl p-4 flex items-center gap-3">
 <Calendar className="w-5 h-5 text-[var(--secondary)] shrink-0" />
 <p className="text-sm font-semibold text-[var(--secondary)]">
 Konteks: Mendekati Akhir Bulan
 </p>
 </div>

 {/* CARD 1 - TINGGI */}
 <div className="bg-[var(--card)] shadow-sm rounded-[1.5rem] p-6 relative overflow-hidden">
 <div className="absolute top-0 right-0 w-20 h-20 bg-[#FFF0F0] rounded-bl-[100%]"></div>
 
 <div className="flex items-center justify-between mb-5 relative z-10">
 <div className="flex items-center gap-2">
 <Box className="w-5 h-5 text-[var(--text)]" />
 <h3 className="text-lg font-bold text-[var(--text)]">Tepung Terigu</h3>
 </div>
 <div className="bg-[#FFF0F0] px-3 py-1.5 rounded-full flex items-center gap-2">
 <div className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse"></div>
 <span className="text-[10px] font-bold text-[#DC2626] uppercase tracking-wider">Tinggi</span>
 </div>
 </div>
 
 <div className="bg-[var(--bg)] rounded-xl p-4 mb-5">
 <p className="text-xs text-[var(--muted)] mb-1">Saran Tindakan</p>
 <p className="text-lg font-bold text-[var(--text)]">Tambah 20 kg</p>
 </div>

 <div className="space-y-4">
 <div>
 <p className="text-xs text-[var(--muted)] mb-1 uppercase tracking-wider font-semibold">Alasan</p>
 <p className="text-sm text-[var(--muted)] leading-relaxed">Permintaan meningkat menjelang akhir bulan</p>
 </div>
 <div>
 <p className="text-xs text-[var(--muted)] mb-1 uppercase tracking-wider font-semibold">Batas Waktu</p>
 <p className="text-sm font-semibold text-[var(--primary)] flex items-center gap-1.5">
 <AlertCircle className="w-4 h-4" /> Sebelum Jumat
 </p>
 </div>
 </div>
 </div>

 {/* CARD 2 - SEDANG */}
 <div className="bg-[var(--card)] shadow-sm rounded-[1.5rem] p-6 relative overflow-hidden">
 <div className="absolute top-0 right-0 w-20 h-20 bg-[#FEF3E2] rounded-bl-[100%]"></div>
 
 <div className="flex items-center justify-between mb-5 relative z-10">
 <div className="flex items-center gap-2">
 <Box className="w-5 h-5 text-[var(--text)]" />
 <h3 className="text-lg font-bold text-[var(--text)]">Minyak Goreng</h3>
 </div>
 <div className="bg-[#FEF3E2] px-3 py-1.5 rounded-full flex items-center gap-2">
 <div className="w-2 h-2 rounded-full bg-[var(--secondary)]"></div>
 <span className="text-[10px] font-bold text-[var(--secondary)] uppercase tracking-wider">Sedang</span>
 </div>
 </div>
 
 <div className="bg-[var(--bg)] rounded-xl p-4 mb-5">
 <p className="text-xs text-[var(--muted)] mb-1">Saran Tindakan</p>
 <p className="text-lg font-bold text-[var(--text)]">Tambah 10 liter</p>
 </div>

 <div className="space-y-4">
 <div>
 <p className="text-xs text-[var(--muted)] mb-1 uppercase tracking-wider font-semibold">Alasan</p>
 <p className="text-sm text-[var(--muted)] leading-relaxed">Stok mendekati habis berdasarkan pola mingguan</p>
 </div>
 </div>
 </div>

 {/* CARD 3 - RENDAH */}
 <div className="bg-[var(--card)] shadow-sm rounded-[1.5rem] p-6 relative overflow-hidden">
 <div className="absolute top-0 right-0 w-20 h-20 bg-[#F0FDF4] rounded-bl-[100%]"></div>
 
 <div className="flex items-center justify-between mb-5 relative z-10">
 <div className="flex items-center gap-2">
 <Box className="w-5 h-5 text-[var(--text)]" />
 <h3 className="text-lg font-bold text-[var(--text)]">Gula Pasir</h3>
 </div>
 <div className="bg-[#F0FDF4] px-3 py-1.5 rounded-full flex items-center gap-2">
 <div className="w-2 h-2 rounded-full bg-[#16A34A]"></div>
 <span className="text-[10px] font-bold text-[#16A34A] uppercase tracking-wider">Rendah</span>
 </div>
 </div>
 
 <div className="bg-[var(--bg)] rounded-xl p-4 mb-5">
 <p className="text-xs text-[var(--muted)] mb-1">Saran Tindakan</p>
 <p className="text-lg font-bold text-[var(--text)]">Tambah 5 kg</p>
 </div>

 <div className="space-y-4">
 <div>
 <p className="text-xs text-[var(--muted)] mb-1 uppercase tracking-wider font-semibold">Alasan</p>
 <p className="text-sm text-[var(--muted)] leading-relaxed">Pembelian rutin bulanan</p>
 </div>
 </div>
 </div>

 {/* REFRESH BUTTON */}
 <div className="pt-4">
 <button className="w-full bg-[var(--primary)] text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
 <RefreshCw className="w-5 h-5 text-white" />
 <span>Perbarui Rekomendasi</span>
 </button>
 </div>

 </main>
 <BottomNav />
 </div>
 </PageWrapper>
 );
}