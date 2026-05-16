'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Edit2, ArrowRight } from 'lucide-react';
import { useFinanceStore } from '@/store/useFinanceStore';

export default function VerificationPage() {
  const router = useRouter();
  const verifyTransactionAndUpdateStock = useFinanceStore(state => state.verifyTransactionAndUpdateStock);
  const [isVerified, setIsVerified] = useState(false);

  // Mock extracted data from Gemini
  const mockTransaction = {
    id: `TX-${Math.floor(Math.random() * 10000)}`,
    date: new Date().toISOString(),
    items: [
      { productId: '1', quantity: 2, name: 'Biji Kopi Arabica 1kg', price: 150000 },
      { productId: '2', quantity: 5, name: 'Susu UHT 1L', price: 18000 }
    ],
    total: 390000
  };

  const handleVerify = () => {
    // 1. Trigger stock update action via Zustand
    verifyTransactionAndUpdateStock({
      id: mockTransaction.id,
      date: mockTransaction.date,
      items: mockTransaction.items.map(i => ({ productId: i.productId, quantity: i.quantity })),
      total: mockTransaction.total
    });

    // 2. Show success state
    setIsVerified(true);
    
    if ('vibrate' in navigator) {
      navigator.vibrate([30, 50, 30]); // Success vibration pattern
    }

    // 3. Navigate back to dashboard after a short delay
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mb-6 border-2 border-secondary"
        >
          <Check size={48} className="text-secondary" />
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-white mb-2"
        >
          Nota Terverifikasi
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-center max-w-sm"
        >
          Data transaksi telah disimpan dan stok barang otomatis diperbarui.
        </motion.p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col p-6">
      <header className="flex items-center justify-between py-4 mb-6">
        <h1 className="text-xl font-bold text-white">Verifikasi Nota</h1>
        <button onClick={() => router.back()} className="text-gray-400">Batal</button>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 rounded-2xl p-6 border border-gray-800 flex-1"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-white">Item Terdeteksi</h2>
          <button className="text-primary-light flex items-center gap-1 text-sm">
            <Edit2 size={14} /> Edit
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {mockTransaction.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center pb-4 border-b border-gray-800">
              <div>
                <p className="text-white font-medium">{item.name}</p>
                <p className="text-gray-400 text-sm">{item.quantity} x Rp {item.price.toLocaleString()}</p>
              </div>
              <p className="text-white font-medium">
                Rp {(item.quantity * item.price).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-8 bg-primary/10 p-4 rounded-xl border border-primary/20">
          <span className="text-gray-300 font-medium">Total Terdeteksi</span>
          <span className="text-2xl font-bold text-white">Rp {mockTransaction.total.toLocaleString()}</span>
        </div>

        <div className="bg-secondary/10 p-4 rounded-xl border border-secondary/20 mb-8 flex gap-3">
          <div className="mt-1"><Check size={18} className="text-secondary" /></div>
          <div>
            <p className="text-white text-sm font-medium">Stok akan diperbarui otomatis</p>
            <p className="text-gray-400 text-xs mt-1">Sistem akan memotong stok untuk item-item di atas.</p>
          </div>
        </div>

        <button 
          onClick={handleVerify}
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-transform active:scale-95 mt-auto"
        >
          Verifikasi & Simpan <ArrowRight size={18} />
        </button>
      </motion.div>
    </div>
  );
}
