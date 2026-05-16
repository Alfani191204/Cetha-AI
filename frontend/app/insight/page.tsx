"use client";

import PageWrapper from "@/components/PageWrapper";
import PageHeader from "@/components/PageHeader";
import { BottomNav } from "@/components/BottomNav";
import { ChevronLeft, TrendingUp, AlertTriangle, PieChart, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/i18n";

export default function InsightPage() {
 const router = useRouter();
 const t = useLang();

 return (
 <PageWrapper>
  <div className="px-5  bg-[var(--bg)] text-[var(--text)] font-sans shadow-xl ">
 {/* Header */}
 <PageHeader title="Smart Insight" subtitle="Analisis otomatis keuanganmu" />

 <main className=" mt-2 space-y-4">
 
 {/* CARD 1 - TREN */}
 <div className="bg-[var(--card)] rounded-2xl p-6 shadow-sm">
 <div className="flex items-center gap-2 mb-4">
 <div className="bg-[#FFF5F3] px-3 py-1 rounded-full flex items-center gap-1.5">
 <TrendingUp className="w-3.5 h-3.5 text-[var(--primary)]" />
 <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider">Tren</span>
 </div>
 </div>
 <h3 className="text-lg font-bold text-[var(--text)] mb-2">Pengeluaran Minggu Ini Naik</h3>
 <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">
 Pengeluaran naik <span className="text-[var(--primary)] font-semibold">23%</span> dibanding minggu lalu
 </p>
 
 {/* Progress bar simulation for change */}
 <div className="w-full bg-[var(--bg)] rounded-full h-2.5 mb-2 relative overflow-hidden">
 <div className="bg-[var(--primary)] h-2.5 rounded-full w-[70%] relative">
 <div className="absolute top-0 right-0 bottom-0 w-2 bg-white/30"></div>
 </div>
 </div>
 <div className="flex justify-between text-[10px] text-[var(--muted)] mb-5 font-medium uppercase tracking-wider">
 <span>Minggu Lalu</span>
 <span>Minggu Ini</span>
 </div>

 <div className="bg-[#FFF5F3] rounded-xl p-4 flex gap-3 items-start">
 <Info className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
 <p className="text-sm text-[var(--muted)]">
 <strong className="text-[var(--primary)] block mb-1">Saran:</strong>
 Kurangi belanja operasional
 </p>
 </div>
 </div>

 {/* CARD 2 - DOMINASI */}
 <div className="bg-[var(--card)] rounded-2xl p-6 shadow-sm">
 <div className="flex items-center gap-2 mb-4">
 <div className="bg-[#FEF3E2] px-3 py-1 rounded-full flex items-center gap-1.5">
 <PieChart className="w-3.5 h-3.5 text-[var(--secondary)]" />
 <span className="text-xs font-bold text-[var(--secondary)] uppercase tracking-wider">Dominasi</span>
 </div>
 </div>
 <h3 className="text-lg font-bold text-[var(--text)] mb-2">Bahan Baku Mendominasi 58%</h3>
 <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">
 Bahan Baku adalah kategori terbesar bulan ini
 </p>
 
 {/* Mini Bar Chart / Visual */}
 <div className="flex items-center gap-3 mb-5">
 <div className="flex-1 h-3 flex rounded-full overflow-hidden bg-[var(--bg)]">
 <div className="bg-[var(--secondary)] w-[58%]" title="Bahan Baku"></div>
 <div className="bg-[var(--border)] w-[42%]" title="Lainnya"></div>
 </div>
 <span className="text-sm font-bold text-[var(--secondary)]">58%</span>
 </div>

 <div className="bg-[#FEF3E2] rounded-xl p-4 flex gap-3 items-start">
 <Info className="w-5 h-5 text-[var(--secondary)] shrink-0 mt-0.5" />
 <p className="text-sm text-[var(--muted)]">
 <strong className="text-[var(--secondary)] block mb-1">Saran:</strong>
 Cari supplier alternatif
 </p>
 </div>
 </div>

 {/* CARD 3 - ANOMALI */}
 <div className="bg-[var(--card)] rounded-2xl p-6 shadow-sm">
 <div className="flex items-center gap-2 mb-4">
 <div className="bg-[#FFF0F0] px-3 py-1 rounded-full flex items-center gap-1.5">
 <AlertTriangle className="w-3.5 h-3.5 text-[#DC2626]" />
 <span className="text-xs font-bold text-[#DC2626] uppercase tracking-wider">Anomali</span>
 </div>
 </div>
 <h3 className="text-lg font-bold text-[var(--text)] mb-2">Pengeluaran Tidak Normal</h3>
 <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">
 Operasional hari ini <span className="text-[#DC2626] font-semibold">3x lebih tinggi</span> dari biasanya
 </p>

 {/* Visual Bar representation of anomaly */}
 <div className="flex items-end justify-between gap-2 h-16 mb-5 px-1">
 <div className="w-full bg-[var(--bg)] rounded-t-md h-[30%]"></div>
 <div className="w-full bg-[var(--bg)] rounded-t-md h-[25%]"></div>
 <div className="w-full bg-[var(--bg)] rounded-t-md h-[35%]"></div>
 <div className="w-full bg-[#DC2626] rounded-t-md h-full relative shadow-[0_0_15px_rgba(220,38,38,0.4)]">
 <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-[#DC2626] font-bold">3x</span>
 </div>
 </div>

 <div className="bg-[#FFF0F0] rounded-xl p-4 flex gap-3 items-start">
 <Info className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
 <p className="text-sm text-[var(--muted)]">
 <strong className="text-[#DC2626] block mb-1">Saran:</strong>
 Periksa transaksi tanggal 15 Mei
 </p>
 </div>
 </div>

 </main>
 <BottomNav />
 </div>
 </PageWrapper>
 );
}