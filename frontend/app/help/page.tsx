"use client";

import PageWrapper from "@/components/PageWrapper";
import PageHeader from "@/components/PageHeader";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const FAQ_ITEMS = [
 {
 question: "Bagaimana cara kerja Cetha AI?",
 answer: "Cetha AI menganalisis setiap nota yang kamu foto menggunakan teknologi pengenalan gambar (OCR), kemudian mencatat dan mengelompokkan pengeluaran dan pemasukanmu secara otomatis."
 },
 {
 question: "Apakah data usahaku aman?",
 answer: "Tentu. Semua data transaksimu dienkripsi dan disimpan dengan standar keamanan tinggi. Kami tidak membagikan datamu kepada pihak ketiga tanpa izin."
 },
 {
 question: "Bagaimana jika nota tidak terbaca?",
 answer: "Jika nota rusak atau buram, kamu selalu bisa mengedit hasil scan secara manual di layar konfirmasi sebelum menyimpan transaksi."
 },
 {
 question: "Apakah Cetha AI gratis?",
 answer: "Saat ini Cetha AI gratis digunakan untuk fitur dasar. Kami mungkin akan menghadirkan fitur premium berlangganan di masa mendatang."
 },
 {
 question: "Cara mengubah profil usaha?",
 answer: "Kamu bisa masuk ke menu Profil > Edit Profil untuk mengubah nama dan jenis usahamu kapan saja."
 }
];

export default function HelpPage() {
 const [openIndex, setOpenIndex] = useState<number | null>(null);

 const toggleFaq = (index: number) => {
 setOpenIndex(openIndex === index ? null : index);
 };

 return (
 <PageWrapper>
  <div className="px-5  bg-[var(--bg)] text-[var(--text)] flex flex-col relative -hidden font-sans ">
 {/* Header */}
 <PageHeader title="Bantuan" />

 {/* FAQ Section */}
 <div className="space-y-4">
 {FAQ_ITEMS.map((faq, idx) => (
 <div key={idx} className="bg-[var(--card)] shadow-sm rounded-2xl border border-[var(--border)] overflow-hidden">
 <button 
 className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
 onClick={() => toggleFaq(idx)}
 >
 <span className="font-semibold text-sm text-[var(--text)] pr-4">{faq.question}</span>
 {openIndex === idx ? (
 <ChevronUp className="w-5 h-5 text-[var(--muted)] shrink-0" />
 ) : (
 <ChevronDown className="w-5 h-5 text-[var(--muted)] shrink-0" />
 )}
 </button>
 {openIndex === idx && (
 <div className="px-4 pb-4">
 <p className="text-sm text-[var(--muted)] leading-relaxed">
 {faq.answer}
 </p>
 </div>
 )}
 </div>
 ))}
 </div>
 
 {/* Contact Support */}
 <div className="mt-8 bg-[#FFF5F3] p-5 rounded-2xl border border-[var(--border)] text-center">
 <p className="text-sm text-[var(--muted)] mb-2">Masih butuh bantuan?</p>
 <a href="mailto:support@cetha.ai" className="inline-block bg-[var(--primary)] text-white font-semibold py-2.5 rounded-xl text-sm shadow-sm hover:opacity-90 transition-opacity">
 Hubungi Kami
 </a>
 </div>
 </div>
 </PageWrapper>
 );
}