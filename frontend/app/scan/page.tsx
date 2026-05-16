"use client";

import PageWrapper from "@/components/PageWrapper";
import PageHeader from "@/components/PageHeader";
import { BottomNav } from "@/components/BottomNav";
import { useState, useRef, useEffect } from "react";
import { Camera, Image as ImageIcon, CheckCircle, Edit, ChevronLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ScanPage() {
 // State Management
 const [isScanning, setIsScanning] = useState(false);
 const [isScanned, setIsScanned] = useState(false);
 const [scanResult, setScanResult] = useState<any>(null);

 // Refs
 const videoRef = useRef<HTMLVideoElement>(null);
 const canvasRef = useRef<HTMLCanvasElement>(null);
 const fileInputRef = useRef<HTMLInputElement>(null);
 const router = useRouter();

 // 1. Inisialisasi Kamera Belakang
 useEffect(() => {
 let stream: MediaStream | null = null;
 const startCamera = async () => {
 try {
 stream = await navigator.mediaDevices.getUserMedia({
 video: { facingMode: "environment" }
 });
 if (videoRef.current) {
 videoRef.current.srcObject = stream;
 }
 } catch (err) {
 console.warn("Kamera tidak tersedia:", err);
 }
 };
 if (!isScanned) startCamera();
 return () => stream?.getTracks().forEach(track => track.stop());
 }, [isScanned]);

 // 2. FUNGSI INTI: KIRIM KE FASTAPI VIA (FIXED URL & HEADERS)
 const processImageToAI = async (imageSource: Blob | File) => {
 setIsScanning(true);

 const formData = new FormData();
 const fileName = imageSource instanceof File ? imageSource.name : "capture_nota.jpg";
 formData.append("file", imageSource, fileName);

 try {
 // PERBAIKAN: Mengarah ke endpoint API, bukan /docs
 const response = await fetch("https://deceased-degraded-carnival.ngrok-free.dev/analyze-receipt", {
 method: "POST",
 body: formData,
 // WAJIB: Agar bypass halaman warning ngrok
 headers: {
 "ngrok-skip-browser-warning": "69420",
 },
 });

 if (!response.ok) throw new Error("Server AI Bermasalah");

 const result = await response.json();

 // Mapping data hasil AI dari Via
 setScanResult(result);
 setIsScanned(true);

 } catch (error) {
 console.error("Fetch Error:", error);
 alert("Gagal terhubung ke AI Via. Pastikan link ngrok benar dan server aktif!");
 } finally {
 setIsScanning(false);
 }
 };

 // 3. Trigger dari Kamera
 const handleCapture = () => {
 if (videoRef.current && canvasRef.current) {
 const video = videoRef.current;
 const canvas = canvasRef.current;
 canvas.width = video.videoWidth;
 canvas.height = video.videoHeight;

 const context = canvas.getContext("2d");
 context?.drawImage(video, 0, 0, canvas.width, canvas.height);

 canvas.toBlob((blob) => {
 if (blob) processImageToAI(blob);
 }, "image/jpeg", 0.8);

 if (navigator.vibrate) navigator.vibrate(50);
 }
 };

 // 4. Trigger dari Galeri
 const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
 const file = e.target.files?.[0];
 if (file) processImageToAI(file);
 };

 const formatCurrency = (amount: number) => {
 return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
 };

 return (
 <PageWrapper>
  <div className="px-5  bg-[var(--bg)] text-[var(--text)] relative font-sans shadow-xl flex flex-col">

 <canvas ref={canvasRef} className="hidden" />
 <input
 type="file"
 ref={fileInputRef}
 onChange={handleGalleryUpload}
 accept="image/*"
 className="hidden"
 />

 <PageHeader title="Scan Nota" subtitle="Foto atau upload nota belanjamu" />

 {!isScanned ? (
 <>
 <div className="relative flex flex-col items-center justify-center mt-4 mb-6">
 <div className="relative w-full h-[320px] max-h-[320px] rounded-[2.5rem] overflow-hidden bg-black border-2 border-[var(--primary)] shadow-2xl">
 <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover opacity-80" />

 <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
 <div className="relative w-[85%] aspect-[3/4] border-2 border-[var(--card)]/20 rounded-3xl shadow-[0_0_0_9999px_rgba(110,21,53,0.4)]">
 <div className="absolute -top-1 -left-1 w-10 h-10 border-t-4 border-l-4 border-[var(--primary)] rounded-tl-2xl"></div>
 <div className="absolute -top-1 -right-1 w-10 h-10 border-t-4 border-r-4 border-[var(--primary)] rounded-tr-2xl"></div>
 <div className="absolute -bottom-1 -left-1 w-10 h-10 border-b-4 border-l-4 border-[var(--primary)] rounded-bl-2xl"></div>
 <div className="absolute -bottom-1 -right-1 w-10 h-10 border-b-4 border-r-4 border-[var(--primary)] rounded-br-2xl"></div>

 {isScanning && (
 <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--secondary)] shadow-[0_0_20px_4px_var(--secondary)] animate-[scan_2s_ease-in-out_infinite]" />
 )}
 </div>
 </div>
 </div>
 <p className="mt-8 text-sm text-[var(--muted)] font-bold tracking-widest uppercase">Scan nota pembelian anda</p>
 </div>

 <div className="space-y-4 pb-12 w-full">
 <button
 onClick={handleCapture}
 disabled={isScanning}
 className="w-full bg-[var(--primary)] hover:bg-[#4A0E23] text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-[var(--primary)]/20 disabled:opacity-50"
 >
 {isScanning ? <Loader2 className="w-6 h-6 animate-spin" /> : <Camera className="w-6 h-6" />}
 <span>{isScanning ? 'Menganalisis...' : 'Ambil Foto'}</span>
 </button>

 <button
 onClick={() => fileInputRef.current?.click()}
 disabled={isScanning}
 className="w-full bg-[var(--card)] border-2 border-[var(--primary)] text-[var(--primary)] font-bold py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all shadow-sm"
 >
 <ImageIcon className="w-6 h-6 text-[var(--primary)]" />
 <span>Pilih dari Galeri</span>
 </button>
 </div>
 </>
 ) : (
 <div className="flex-1 overflow-y-auto pb-10 pt-4">
 <div className="bg-[var(--card)] rounded-[2.5rem] p-8 shadow-xl border border-[var(--border)]/50">
 <div className="flex justify-between items-start mb-8">
 <div>
 <p className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest">Nama Toko</p>
 <p className="text-base font-black text-[var(--text)]">{scanResult?.nama_toko || "Toko Tidak Terdeteksi"}</p>
 </div>
 <div className="text-right">
 <p className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest">Tanggal</p>
 <p className="text-sm font-bold text-[var(--text)]">{scanResult?.tanggal || "--/--/----"}</p>
 </div>
 </div>

 <div className="space-y-4 mb-8">
 {scanResult?.items?.map((item: any, idx: number) => (
 <div key={idx} className="flex justify-between text-sm">
 <div className="flex-1">
 <p className="text-[var(--text)] font-bold">{item.nama}</p>
 <p className="text-[10px] text-[var(--muted)] font-medium">Qty: {item.qty || 1} x {formatCurrency(item.harga)}</p>
 </div>
 <p className="font-bold text-[var(--primary)]">{formatCurrency(item.harga * (item.qty || 1))}</p>
 </div>
 ))}
 </div>

 <div className="border-t-2 border-dashed border-[var(--border)] pt-6">
 <div className="flex justify-between items-center mb-4">
 <p className="text-[var(--muted)] text-xs font-bold uppercase">Total Akhir</p>
 <p className="text-2xl font-black text-[var(--primary)] tracking-tighter">{formatCurrency(scanResult?.total || 0)}</p>
 </div>
 <div className="flex justify-between items-center">
 <p className="text-[var(--muted)] text-xs font-bold uppercase">Kategori AI</p>
 <span className="bg-[var(--primary)]/10 text-[var(--primary)] text-[10px] font-black px-4 py-1.5 rounded-full border border-[var(--primary)]/20 uppercase">
 {scanResult?.category || "UMUM"}
 </span>
 </div>
 </div>
 </div>

 <div className="mt-8 space-y-4">
 <button
 onClick={() => router.push('/')}
 className="w-full bg-[var(--primary)] text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-[var(--primary)]/30 active:scale-95 transition-transform"
 >
 <CheckCircle className="w-6 h-6 text-white" />
 <span>KONFIRMASI DATA</span>
 </button>
 <button
 onClick={() => setIsScanned(false)}
 className="w-full bg-transparent border-2 border-[var(--primary)] text-[var(--primary)] font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
 >
 <Edit className="w-5 h-5 text-[var(--primary)]" /> Reset & Scan Ulang
 </button>
 </div>
 </div>
 )}

 <BottomNav />

 <style jsx global>{`
 @keyframes scan {
 0% { top: 0%; }
 50% { top: 100%; }
 100% { top: 0%; }
 }
 .no-scrollbar::-webkit-scrollbar { display: none; }
 `}</style>
 </div>
 </PageWrapper>
 );
}