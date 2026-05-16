"use client";

import PageWrapper from "@/components/PageWrapper";
import PageHeader from "@/components/PageHeader";
import { useRef } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import Link from "next/link";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ReportPage() {
 const reportRef = useRef<HTMLDivElement>(null);

 const handleDownloadPdf = async () => {
 if (!reportRef.current) return;
 
 try {
 const canvas = await html2canvas(reportRef.current, {
 scale: 2,
 backgroundColor: '#1E293B', // matches the card background
 useCORS: true,
 });
 
 const imgData = canvas.toDataURL("image/png");
 const pdf = new jsPDF({
 orientation: "portrait",
 unit: "px",
 format: [canvas.width, canvas.height]
 });
 
 pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
 pdf.save("Laporan-Keuangan-Mei-2026.pdf");
 } catch (error) {
 console.error("Failed to generate PDF", error);
 }
 };

 return (
 <PageWrapper>
  <div className="px-5  bg-[#0F172A] text-white relative -hidden font-sans">
 {/* Header */}
 <PageHeader title="Laporan Keuangan" />

 <div className=" mt-6 space-y-4">
 {/* Filter Bar */}
 <div className="flex gap-3">
 <div className="relative flex-1">
 <select className="w-full bg-[#1E293B] border border-slate-700/50 text-white text-sm rounded-xl px-4 py-3 appearance-none outline-none focus:border-blue-500/50 transition-colors">
 <option>Mei 2026</option>
 <option>April 2026</option>
 <option>Maret 2026</option>
 </select>
 <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
 </div>
 <div className="relative flex-[1.5]">
 <select className="w-full bg-[#1E293B] border border-slate-700/50 text-white text-sm rounded-xl px-4 py-3 appearance-none outline-none focus:border-blue-500/50 transition-colors">
 <option>Laba Rugi</option>
 <option>Pengeluaran</option>
 </select>
 <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
 </div>
 </div>

 {/* Preview Laporan */}
 <div>
 <h2 className="text-sm font-semibold text-white mb-3">Preview Laporan</h2>
 
 <div 
 ref={reportRef} 
 className="bg-[#1E293B] rounded-2xl p-6 border border-slate-700/50 shadow-lg"
 >
 <div className="text-center mb-6 pb-6 border-b border-slate-700/50">
 <h3 className="font-bold text-lg text-white tracking-wider">CETHA AI</h3>
 <p className="text-sm text-gray-300 mt-1">Laporan Laba Rugi</p>
 <p className="text-xs text-gray-400">Mei 2026</p>
 <p className="text-sm font-semibold text-white mt-2">Toko Sumber Rezeki</p>
 </div>

 <div className="space-y-4">
 <div>
 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Pemasukan</p>
 <div className="flex justify-between text-sm">
 <span className="text-gray-300">Penjualan</span>
 <span className="text-white font-medium">Rp 5.800.000</span>
 </div>
 </div>

 <div className="pb-6 border-b border-slate-700/50">
 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Pengeluaran</p>
 <div className="space-y-2.5 text-sm">
 <div className="flex justify-between">
 <span className="text-gray-300">Bahan Baku</span>
 <span className="text-red-400">Rp 1.100.000</span>
 </div>
 <div className="flex justify-between">
 <span className="text-gray-300">Operasional</span>
 <span className="text-red-400">Rp 735.000</span>
 </div>
 <div className="flex justify-between">
 <span className="text-gray-300">Transportasi</span>
 <span className="text-red-400">Rp 368.000</span>
 </div>
 <div className="flex justify-between">
 <span className="text-gray-300">Lainnya</span>
 <span className="text-red-400">Rp 247.000</span>
 </div>
 </div>
 </div>

 <div className="flex justify-between items-center pt-2">
 <span className="text-sm font-bold text-white uppercase tracking-wider">Laba Bersih</span>
 <span className="text-lg font-bold text-green-400">Rp 3.350.000</span>
 </div>
 </div>
 </div>
 </div>

 {/* Download Button */}
 <button 
 onClick={handleDownloadPdf}
 className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-lg shadow-green-900/20"
 >
 ⬇️ Download PDF
 </button>
 </div>
 </div>
 </PageWrapper>
 );
}