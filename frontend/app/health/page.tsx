"use client";

import PageWrapper from "@/components/PageWrapper";
import PageHeader from "@/components/PageHeader";
import { ArrowLeft, ArrowUpRight, TrendingUp, AlertTriangle, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function HealthScoreDetail() {
 const score = 82;

 const indicators = [
 {
 id: 1,
 name: "Arus Kas (Cash Flow)",
 score: 85,
 status: "Sangat Baik",
 icon: <TrendingUp className="w-5 h-5 text-[var(--primary)]" />,
 color: "good",
 iconBg: "bg-[#FFF5F3]",
 explanation: "Pemasukan rutin menutupi pengeluaran bulanan dengan baik. Terdapat sisa kas yang cukup untuk operasional.",
 suggestion: "Pertahankan rasio kas ini. Anda dapat mempertimbangkan menyisihkan 10% lebih banyak untuk dana darurat usaha.",
 },
 {
 id: 2,
 name: "Efisiensi Operasional",
 score: 78,
 status: "Baik",
 icon: <ShieldCheck className="w-5 h-5 text-[var(--primary)]" />,
 color: "good",
 iconBg: "bg-[#FFF5F3]",
 explanation: "Biaya operasional seperti listrik dan transportasi terjaga di bawah 40% dari total pendapatan.",
 suggestion: "Cari alternatif bahan baku yang lebih murah tanpa mengurangi kualitas untuk meningkatkan efisiensi.",
 },
 {
 id: 3,
 name: "Konsistensi Pemasukan",
 score: 65,
 status: "Perlu Perhatian",
 icon: <AlertTriangle className="w-5 h-5 text-[var(--secondary)]" />,
 color: "warning",
 iconBg: "bg-[#FEF3E2]",
 explanation: "Penjualan harian naik turun secara signifikan dalam seminggu terakhir. Belum ada kestabilan yang jelas.",
 suggestion: "Coba buat program loyalitas atau promo di hari-hari sepi untuk menstabilkan jumlah transaksi harian.",
 }
 ];

 return (
 <PageWrapper>
  <div className="px-5  bg-[var(--bg)] text-[var(--text)] relative -hidden font-sans">
 {/* Header */}
 <PageHeader title="Detail Kesehatan Keuangan" />

 {/* Main Score Board */}
 <div className=" mt-6">
 <div className="bg-[var(--card)] shadow-sm rounded-3xl p-6 border border-[var(--border)] text-center">
 <h2 className="text-sm font-medium text-[var(--muted)] mb-6">Skor Kesehatan Anda</h2>
 <div className="relative inline-flex items-center justify-center w-32 h-32 rounded-full border-[6px] border-[var(--primary)] bg-[#FFF5F3] shadow-[0_0_20px_rgba(110,21,53,0.1)] mb-4">
 <span className="text-5xl font-extrabold text-[var(--text)]">{score}</span>
 </div>
 <div className="inline-block bg-[#FFF5F3] border border-[var(--border)] text-[var(--primary)] px-4 py-1.5 rounded-full text-sm font-semibold mb-2">
 Status: Sehat 💚
 </div>
 <p className="text-xs text-[var(--muted)] leading-relaxed mt-2">
 Usaha Anda dalam kondisi stabil. Arus kas positif dan pengeluaran terkendali.
 </p>
 </div>
 </div>

 {/* Indicators List */}
 <div className=" mt-8 space-y-4">
 <h3 className="text-base font-semibold text-[var(--text)]">Analisis Indikator</h3>
 
 {indicators.map((item) => (
 <div key={item.id} className="bg-[var(--card)] rounded-2xl p-5 border border-[var(--border)] shadow-sm">
 <div className="flex items-start justify-between mb-4">
 <div className="flex items-center gap-3">
 <div className={`p-2.5 rounded-xl ${item.iconBg}`}>
 {item.icon}
 </div>
 <div>
 <h4 className="font-semibold text-sm text-[var(--text)]">{item.name}</h4>
 <p className={`text-xs mt-0.5 font-medium ${item.color === 'good' ? 'text-[var(--primary)]' : 'text-[var(--secondary)]'}`}>
 {item.status} ({item.score}/100)
 </p>
 </div>
 </div>
 </div>

 <div className="space-y-4">
 <div>
 <p className="text-[10px] uppercase font-bold tracking-wider text-[var(--muted)] mb-1.5">Penjelasan</p>
 <p className="text-xs text-[var(--muted)] leading-relaxed">
 {item.explanation}
 </p>
 </div>
 
 <div className="bg-[#FFF5F3] p-3.5 rounded-xl">
 <p className="text-[10px] uppercase font-bold tracking-wider text-[var(--primary)] mb-1.5 flex items-center gap-1.5">
 <ArrowUpRight className="w-3 h-3" />
 Saran Peningkatan
 </p>
 <p className="text-xs text-[var(--primary)] leading-relaxed">
 {item.suggestion}
 </p>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </PageWrapper>
 );
}