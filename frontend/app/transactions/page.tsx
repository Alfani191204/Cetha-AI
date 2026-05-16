"use client";

import PageWrapper from "@/components/PageWrapper";
import PageHeader from "@/components/PageHeader";
import { BottomNav } from "@/components/BottomNav";
import { useState } from "react";
import { ArrowLeft, Search, Filter, Coffee, Bus, Box, Lightbulb } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/i18n";

// Dummy Data
const DUMMY_TRANSACTIONS = [
 { id: 1, name: 'Biji Kopi Arabica 1kg', category: 'Bahan Baku', amount: 150000, date: '16 Mei 2026', icon: <Coffee className="w-5 h-5 text-[var(--primary)]" /> },
 { id: 2, name: 'Ongkir GoSend', category: 'Transportasi', amount: 25000, date: '16 Mei 2026', icon: <Bus className="w-5 h-5 text-[var(--secondary)]" /> },
 { id: 3, name: 'Susu UHT 1 Dus', category: 'Bahan Baku', amount: 180000, date: '15 Mei 2026', icon: <Box className="w-5 h-5 text-[var(--primary)]" /> },
 { id: 4, name: 'Listrik Toko', category: 'Operasional', amount: 350000, date: '14 Mei 2026', icon: <Lightbulb className="w-5 h-5 text-[var(--secondary)]" /> },
 { id: 5, name: 'Sirup Vanilla', category: 'Bahan Baku', amount: 85000, date: '14 Mei 2026', icon: <Coffee className="w-5 h-5 text-[var(--primary)]" /> },
 { id: 6, name: 'Bensin Motor', category: 'Transportasi', amount: 35000, date: '13 Mei 2026', icon: <Bus className="w-5 h-5 text-[var(--secondary)]" /> },
 { id: 7, name: 'Gelas Cup Plastik', category: 'Operasional', amount: 120000, date: '13 Mei 2026', icon: <Box className="w-5 h-5 text-[var(--primary)]" /> },
 { id: 8, name: 'Air Galon (4x)', category: 'Bahan Baku', amount: 80000, date: '12 Mei 2026', icon: <Coffee className="w-5 h-5 text-[var(--primary)]" /> },
 { id: 9, name: 'Sewa Tempat', category: 'Operasional', amount: 2500000, date: '10 Mei 2026', icon: <Lightbulb className="w-5 h-5 text-[var(--secondary)]" /> },
 { id: 10, name: 'Gula Aren 5kg', category: 'Bahan Baku', amount: 110000, date: '09 Mei 2026', icon: <Box className="w-5 h-5 text-[var(--primary)]" /> },
 { id: 11, name: 'Servis Mesin Kopi', category: 'Operasional', amount: 450000, date: '08 Mei 2026', icon: <Lightbulb className="w-5 h-5 text-[var(--secondary)]" /> },
 { id: 12, name: 'Transport Belanja', category: 'Transportasi', amount: 50000, date: '08 Mei 2026', icon: <Bus className="w-5 h-5 text-[var(--secondary)]" /> },
];

const FILTERS = ["Semua", "Bahan Baku", "Operasional", "Transportasi"];

export default function TransactionsPage() {
 const router = useRouter();
 const t = useLang();
 const [search, setSearch] = useState("");
 const [activeFilter, setActiveFilter] = useState("Semua");

 const formatCurrency = (amount: number) => {
 return new Intl.NumberFormat('id-ID', {
 style: 'currency',
 currency: 'IDR',
 minimumFractionDigits: 0,
 }).format(amount);
 };

 const filteredData = DUMMY_TRANSACTIONS.filter(tx => {
 const matchesSearch = tx.name.toLowerCase().includes(search.toLowerCase()) || tx.category.toLowerCase().includes(search.toLowerCase());
 const matchesFilter = activeFilter === "Semua" || tx.category === activeFilter;
 return matchesSearch && matchesFilter;
 });

 return (
 <PageWrapper>
  <div className="px-5  bg-[var(--bg)] text-[var(--text)] flex flex-col relative -hidden font-sans ">
 
 {/* Header */}
 <PageHeader title="Semua Transaksi" />

 {/* Search Bar */}
 <div className=" mb-5">
 <div className="relative group">
 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
 <Search className="h-4 w-4 text-[var(--muted)] group-focus-within:text-[var(--primary)] transition-colors" />
 </div>
 <input
 type="text"
 value={search}
 onChange={(e) => setSearch(e.target.value)}
 className="block w-full pl-10 pr-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-2xl text-sm text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--primary)] transition-all"
 placeholder="Cari transaksi..."
 />
 </div>
 </div>

 {/* Filter Chips */}
 <div className=" mb-6 overflow-x-auto no-scrollbar flex gap-2">
 {FILTERS.map(filter => (
 <button
 key={filter}
 onClick={() => setActiveFilter(filter)}
 className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border ${
 activeFilter === filter 
 ? "bg-[var(--primary)] text-white border-[var(--primary)]" 
 : "bg-[var(--card)] text-[var(--muted)] border-[var(--border)] hover:bg-gray-50 dark:hover:bg-[#3D1010]"
 }`}
 >
 {filter}
 </button>
 ))}
 </div>

 {/* Transactions List */}
 <div className=" space-y-3 flex-1">
 {filteredData.length > 0 ? (
 filteredData.map((tx) => (
 <div key={tx.id} className="bg-[var(--card)] shadow-sm p-4 rounded-2xl flex items-center gap-4 border border-[var(--border)]/50">
 <div className="w-11 h-11 rounded-full bg-[#FFF5F3] flex items-center justify-center shrink-0">
 {tx.icon}
 </div>
 <div className="flex-1 min-w-0">
 <p className="font-bold text-sm text-[var(--text)] truncate">{tx.name}</p>
 <div className="flex items-center text-xs mt-1 gap-2">
 <span className="text-[var(--muted)]">{tx.category}</span>
 <span className="w-1 h-1 bg-[var(--border)] rounded-full"></span>
 <span className="text-[var(--muted)]">{tx.date}</span>
 </div>
 </div>
 <div className="text-right shrink-0">
 <p className="font-bold text-sm text-[var(--primary)]">-{formatCurrency(tx.amount)}</p>
 </div>
 </div>
 ))
 ) : (
 <div className="flex flex-col items-center justify-center py-10 text-center">
 <Filter className="w-12 h-12 text-[var(--border)] mb-3" />
 <p className="text-[var(--text)] font-semibold mb-1">Transaksi tidak ditemukan</p>
 <p className="text-sm text-[var(--muted)]">Coba gunakan kata kunci atau kategori lain.</p>
 </div>
 )}
 </div>

 <style jsx global>{`
 .no-scrollbar::-webkit-scrollbar { display: none; }
 `}</style>
 <BottomNav />
 </div>
 </PageWrapper>
 );
}