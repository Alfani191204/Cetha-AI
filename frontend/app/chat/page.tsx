"use client";

import PageWrapper from "@/components/PageWrapper";
import { useState, useRef, useEffect } from "react";

type Message = {
 id: number;
 role: "user" | "cetha";
 text: string;
 time: string;
};

const getTime = () =>
 new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

const DUMMY_REPLIES: Record<string, string> = {
 "Bulan ini aku untung berapa?":
 "Berdasarkan data transaksimu bulan Mei 🗓️, total pemasukan Rp 5.800.000 dan pengeluaran Rp 2.450.000. Laba bersihmu **Rp 3.350.000** — naik 12% dari bulan lalu! 🎉 Pertahankan ya!",
 "Pengeluaran terbesar apa?":
 "Pengeluaran terbesarmu bulan ini adalah **Bahan Baku** sebesar Rp 1.100.000 (45% dari total pengeluaran) 🛒. Diikuti Operasional Rp 735.000 dan Transportasi Rp 368.000.",
 "Kapan waktu terbaik beli stok?":
 "Berdasarkan pola historismu, waktu terbaik beli stok adalah **awal minggu (Senin–Selasa)** 📦. Hindari beli di akhir bulan karena harga cenderung naik. Untuk Lebaran, mulai stok **2 minggu sebelumnya**.",
 "Bagaimana kesehatan keuanganku?":
 "Skor kesehatan keuanganmu **82/100** — status Sehat 💚! Arus kas sangat baik (85), efisiensi bagus (78), tapi konsistensi pencatatan perlu ditingkatkan (65). Coba scan nota setiap hari ya!",
};

const FALLBACK =
 "Maaf, aku belum bisa menjawab itu sekarang 😅. Coba tanya tentang pengeluaran, pemasukan, stok, atau kesehatan keuanganmu!";

const SUGGESTED = [
 "Bulan ini aku untung berapa?",
 "Pengeluaran terbesar apa?",
 "Kapan waktu terbaik beli stok?",
 "Bagaimana kesehatan keuanganku?",
];

const INITIAL_MESSAGES: Message[] = [
 {
 id: 1,
 role: "cetha",
 text: "Halo! Aku Cetha AI 👋 Asisten keuangan pintarmu. Ada yang bisa aku bantu untuk usahamu hari ini?",
 time: "09.00",
 },
];

export default function ChatPage() {
 const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
 const [input, setInput] = useState("");
 const [isTyping, setIsTyping] = useState(false);
 const bottomRef = useRef<HTMLDivElement>(null);
 const inputRef = useRef<HTMLInputElement>(null);

 useEffect(() => {
 bottomRef.current?.scrollIntoView({ behavior: "smooth" });
 }, [messages, isTyping]);

 const sendMessage = (text: string) => {
 if (!text.trim()) return;
 const userMsg: Message = { id: Date.now(), role: "user", text, time: getTime() };
 setMessages((prev) => [...prev, userMsg]);
 setInput("");
 setIsTyping(true);

 setTimeout(() => {
 const reply = DUMMY_REPLIES[text] ?? FALLBACK;
 const cethaMsg: Message = {
 id: Date.now() + 1,
 role: "cetha",
 text: reply,
 time: getTime(),
 };
 setMessages((prev) => [...prev, cethaMsg]);
 setIsTyping(false);
 }, 1200);
 };

 const handleKeyDown = (e: React.KeyboardEvent) => {
 if (e.key === "Enter") sendMessage(input);
 };

 // Bold **text** renderer
 const renderText = (text: string) =>
 text.split(/(\*\*.*?\*\*)/g).map((part, i) =>
 part.startsWith("**") && part.endsWith("**") ? (
 <strong key={i} className="font-semibold text-[var(--primary)]">
 {part.slice(2, -2)}
 </strong>
 ) : (
 <span key={i}>{part}</span>
 )
 );

 return (
 <PageWrapper>
 <div className="flex flex-col h-screen bg-[var(--bg)] relative">

 {/* HEADER */}
 <div className="flex items-center gap-3 px-4 py-4 bg-[var(--card)] border-b border-[var(--border)] shrink-0">
 <a href="/" className="text-[var(--primary)] hover:opacity-80 transition-opacity">
 <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
 </svg>
 </a>
 {/* Avatar */}
 <div className="relative">
 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-lg shadow-sm overflow-hidden p-1.5">
 <img src="/icon-512x512.png" className="w-full h-full object-contain p-1" />
 </div>
 <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#16A34A] rounded-full border-2 border-[var(--card)]" />
 </div>
 <div className="flex-1">
 <p className="text-[var(--text)] font-semibold text-sm leading-tight">Cetha AI</p>
 <p className="text-[#16A34A] text-xs">Online • Siap membantu</p>
 </div>
 </div>

 {/* MESSAGES */}
 <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-hide">
 {messages.map((msg) => (
 <div
 key={msg.id}
 className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
 >
 {/* Avatar */}
 {msg.role === "cetha" && (
 <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-xs shrink-0 mb-1 overflow-hidden p-1">
 <img src="/icon-512x512.png" className="w-full h-full object-contain p-1" />
 </div>
 )}

 <div className={`flex flex-col gap-1 max-w-[78%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
 <div
 className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
 ? "bg-[var(--primary)] text-white rounded-tr-sm"
 : "bg-[var(--card)] text-[var(--text)] rounded-tl-sm border border-[var(--border)]"
 }`}
 >
 {renderText(msg.text)}
 </div>
 <span className="text-[var(--muted)] text-[10px] px-1">{msg.time}</span>
 </div>
 </div>
 ))}

 {/* Typing Indicator */}
 {isTyping && (
 <div className="flex items-end gap-2">
 <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-xs shrink-0 overflow-hidden p-1">
 <img src="/icon-512x512.png" className="w-full h-full object-contain p-1" />
 </div>
 <div className="bg-[var(--card)] border border-[var(--border)] px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
 <span className="w-2 h-2 bg-[var(--primary)] rounded-full animate-bounce [animation-delay:0ms]" />
 <span className="w-2 h-2 bg-[var(--primary)] rounded-full animate-bounce [animation-delay:150ms]" />
 <span className="w-2 h-2 bg-[var(--primary)] rounded-full animate-bounce [animation-delay:300ms]" />
 </div>
 </div>
 )}

 <div ref={bottomRef} />
 </div>

 {/* SUGGESTED QUESTIONS */}
 {messages.length <= 2 && !isTyping && (
 <div className="px-4 pb-2 shrink-0">
 <p className="text-[var(--muted)] text-xs mb-2">💡 Coba tanya:</p>
 <div className="flex flex-wrap gap-2">
 {SUGGESTED.map((q) => (
 <button
 key={q}
 onClick={() => sendMessage(q)}
 className="text-xs px-3 py-2 rounded-full bg-[#FFF5F3] border border-[var(--border)] text-[var(--primary)] hover:bg-[var(--border)] active:scale-95 transition-all"
 >
 {q}
 </button>
 ))}
 </div>
 </div>
 )}

 {/* INPUT BAR */}
 <div className="px-4 py-3 bg-[var(--card)] border-t border-[var(--border)] shrink-0">
 <div className="flex items-center gap-3 bg-[var(--card)] rounded-2xl px-4 py-2.5 border border-[var(--border)] focus-within:border-[var(--primary)] transition-colors">
 <input
 ref={inputRef}
 type="text"
 value={input}
 onChange={(e) => setInput(e.target.value)}
 onKeyDown={handleKeyDown}
 placeholder="Tanya Cetha AI..."
 className="flex-1 bg-transparent text-[var(--text)] text-sm placeholder-[var(--muted)] outline-none"
 />
 <button
 onClick={() => sendMessage(input)}
 disabled={!input.trim() || isTyping}
 className="w-8 h-8 rounded-xl bg-[var(--primary)] disabled:opacity-50 flex items-center justify-center transition-all active:scale-90 disabled:cursor-not-allowed"
 >
 <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
 </svg>
 </button>
 </div>
 </div>

 </div>
 </PageWrapper>
 );
}