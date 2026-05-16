"use client";

import { ChevronLeft, TrendingUp, AlertTriangle, PieChart, Info } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InsightsPage() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-[430px] min-h-screen bg-[#0F172A] text-white font-sans shadow-xl pb-10">
      {/* Header */}
      <header className="px-6 pt-10 pb-6 flex flex-col gap-4 sticky top-0 bg-[#0F172A] z-20">
        <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center bg-[#1E293B] rounded-full text-white">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Smart Insight</h1>
          <p className="text-sm text-gray-400 mt-1">Analisis otomatis keuanganmu</p>
        </div>
      </header>

      <main className="px-6 mt-2 space-y-5">
        
        {/* CARD 1 - TREN */}
        <div className="bg-[#1E293B] rounded-[1.5rem] p-6 border border-slate-700/50 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Tren</span>
            </div>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Pengeluaran Minggu Ini Naik</h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-5">
            Pengeluaran minggu ini naik <span className="text-red-400 font-semibold">23%</span> dibanding minggu lalu.
          </p>
          
          {/* Progress bar simulation for change */}
          <div className="w-full bg-slate-800 rounded-full h-2.5 mb-2 relative overflow-hidden">
            <div className="bg-red-500 h-2.5 rounded-full w-[70%] relative">
              <div className="absolute top-0 right-0 bottom-0 w-2 bg-white/30"></div>
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-gray-500 mb-5 font-medium uppercase tracking-wider">
            <span>Minggu Lalu</span>
            <span>Minggu Ini</span>
          </div>

          <div className="bg-blue-500/10 rounded-xl p-4 flex gap-3 items-start border border-blue-500/20">
            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-100">
              <strong className="text-blue-300 block mb-1">Saran:</strong>
              Pertimbangkan mengurangi belanja operasional.
            </p>
          </div>
        </div>

        {/* CARD 2 - DOMINASI */}
        <div className="bg-[#1E293B] rounded-[1.5rem] p-6 border border-slate-700/50 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-500/30 flex items-center gap-1.5">
              <PieChart className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">Dominasi</span>
            </div>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Bahan Baku Mendominasi</h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-5">
            Bahan Baku mencapai <span className="text-yellow-400 font-semibold">58%</span> dari total pengeluaran bulan ini.
          </p>
          
          {/* Mini Bar Chart / Visual */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-3 flex rounded-full overflow-hidden bg-slate-800">
              <div className="bg-yellow-500 w-[58%]" title="Bahan Baku"></div>
              <div className="bg-slate-600 w-[42%]" title="Lainnya"></div>
            </div>
            <span className="text-sm font-bold text-yellow-400">58%</span>
          </div>

          <div className="bg-yellow-500/10 rounded-xl p-4 flex gap-3 items-start border border-yellow-500/20">
            <Info className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-100">
              <strong className="text-yellow-300 block mb-1">Saran:</strong>
              Cari supplier alternatif untuk efisiensi.
            </p>
          </div>
        </div>

        {/* CARD 3 - ANOMALI */}
        <div className="bg-[#1E293B] rounded-[1.5rem] p-6 border border-slate-700/50 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-red-500/20 px-3 py-1 rounded-full border border-red-500/30 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Anomali</span>
            </div>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Pengeluaran Tidak Normal Terdeteksi</h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-5">
            Pengeluaran Operasional hari ini <span className="text-red-400 font-semibold">3x lebih tinggi</span> dari biasanya.
          </p>

          {/* Visual Bar representation of anomaly */}
          <div className="flex items-end justify-between gap-2 h-16 mb-5 px-1">
            <div className="w-full bg-slate-700 rounded-t-md h-[30%]"></div>
            <div className="w-full bg-slate-700 rounded-t-md h-[25%]"></div>
            <div className="w-full bg-slate-700 rounded-t-md h-[35%]"></div>
            <div className="w-full bg-red-500 rounded-t-md h-full relative shadow-[0_0_15px_rgba(239,68,68,0.4)]">
               <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-red-400 font-bold">3x</span>
            </div>
          </div>

          <div className="bg-red-500/10 rounded-xl p-4 flex gap-3 items-start border border-red-500/20">
            <Info className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-100">
              <strong className="text-red-300 block mb-1">Saran:</strong>
              Periksa kembali transaksi tanggal 15 Mei.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}
