"use client";

import PageWrapper from "@/components/PageWrapper";
import { BottomNav } from "@/components/BottomNav";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
 User,
 HelpCircle,
 Moon,
 Globe,
 ChevronRight,
 LogOut,
 ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useLang } from "@/lib/i18n";

interface UserProfile {
 nama: string;
 usaha: string;
}

export default function ProfilePage() {
 const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
 const router = useRouter();

 // State management for Theme & Language
 const { theme, setTheme } = useTheme();
 const t = useLang();
 const [language, setLanguage] = useState(() => {
 if (typeof window !== 'undefined') {
 return localStorage.getItem('cetha_lang') || 'ID';
 }
 return 'ID';
 });
 const [mounted, setMounted] = useState(false);
 const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

 useEffect(() => {
 setMounted(true);
 const userData = localStorage.getItem("cetha_user");
 if (!userData) {
 router.push("/login");
 } else {
 try {
 setUserProfile(JSON.parse(userData));
 } catch (e) {
 setUserProfile({ nama: "User", usaha: "Usaha Saya" });
 }
 }
 }, [router]);

 const handleLogout = () => {
 setIsLogoutModalOpen(true);
 };

 const confirmLogout = () => {
 localStorage.removeItem("cetha_user");
 router.push("/login");
 };

 const handleToggleTheme = () => {
 setTheme(theme === "dark" ? "light" : "dark");
 };

 const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
 const newLang = e.target.value;
 setLanguage(newLang);
 localStorage.setItem("cetha_lang", newLang);
 window.dispatchEvent(new Event('storage')); // Optional: to trigger updates
 };

 if (!userProfile || !mounted) return null;

 const getInitials = (name: string) => {
 return name
 .split(' ')
 .map(n => n[0])
 .join('')
 .substring(0, 2)
 .toUpperCase();
 };

 const isDark = theme === "dark";

 return (
 <PageWrapper>
 <div className=" bg-[var(--bg)] text-[var(--text)] flex flex-col font-sans relative ">

 {/* Header - Tetap Diam di Atas */}
 <header className="pt-10 pb-4 flex items-center justify-between shrink-0 z-10 bg-[var(--bg)] w-full">
 <Link href="/" className="p-2 bg-[var(--card)] shadow-sm rounded-full hover:opacity-80 transition-opacity">
 <ArrowLeft className="w-5 h-5 text-[var(--text)]" />
 </Link>
 <h1 className="text-lg font-semibold text-[var(--text)] tracking-tight">{t.profile}</h1>
 <div className="w-9"></div>
 </header>

 {/* Container Konten - Area yang Bisa Di-scroll */}
 <div className="space-y-6 w-full px-0">

 {/* Profile Header */}
 <div className="flex flex-col items-center mt-2 w-full text-center">
 <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] p-1 mb-3 shadow-sm">
 <div className="w-full h-full bg-[var(--bg)] rounded-full border-2 border-[var(--bg)] flex items-center justify-center">
 <span className="text-lg font-bold text-[var(--text)] tracking-widest">
 {getInitials(userProfile.nama)}
 </span>
 </div>
 </div>
 <h2 className="text-xl font-bold text-[var(--text)] mb-1">{userProfile.nama}</h2>
 <p className="text-sm text-[var(--muted)] mb-3">{userProfile.usaha}</p>
 <span className="px-3 py-1 bg-[#FFF5F3] text-[var(--primary)] text-xs font-semibold rounded-full border border-[var(--border)] inline-block">
 Bisnis UMKM
 </span>
 </div>

 {/* Menu List */}
 <div className="space-y-3 w-full px-0">

 {/* Edit Profil */}
 <Link href="/profile/edit" className="w-full flex items-center justify-between p-3 bg-[var(--card)] shadow-sm rounded-2xl border border-[var(--border)] hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
 <div className="flex items-center w-full">
 <div className="p-2 bg-[#FFF5F3] rounded-xl mr-4 transition-colors shrink-0">
 <User className="w-5 h-5 text-[var(--primary)]" />
 </div>
 <span className="flex-1 text-left text-sm font-medium text-[var(--text)]">{t.edit_profile}</span>
 <ChevronRight className="w-4 h-4 text-[var(--muted)] shrink-0" />
 </div>
 </Link>

 {/* Bantuan */}
 <Link href="/help" className="w-full flex items-center justify-between p-3 bg-[var(--card)] shadow-sm rounded-2xl border border-[var(--border)] hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
 <div className="flex items-center w-full">
 <div className="p-2 bg-[#FFF5F3] rounded-xl mr-4 transition-colors shrink-0">
 <HelpCircle className="w-5 h-5 text-[var(--primary)]" />
 </div>
 <span className="flex-1 text-left text-sm font-medium text-[var(--text)]">{t.help}</span>
 <ChevronRight className="w-4 h-4 text-[var(--muted)] shrink-0" />
 </div>
 </Link>

 {/* Mode Gelap Toggle */}
 <div className="w-full flex items-center justify-between p-3 bg-[var(--card)] shadow-sm rounded-2xl border border-[var(--border)]">
 <div className="flex items-center w-full">
 <div className="p-2 bg-[#FFF5F3] rounded-xl mr-4 shrink-0">
 <Moon className="w-5 h-5 text-[var(--primary)]" />
 </div>
 <span className="flex-1 text-left text-sm font-medium text-[var(--text)]">{t.dark_mode}</span>
 <button
 onClick={handleToggleTheme}
 className={`w-10 h-6 shrink-0 rounded-full transition-colors relative flex items-center ${isDark ? 'bg-[var(--primary)]' : 'bg-[var(--border)]'}`}
 >
 <span className={`w-4 h-4 bg-white rounded-full absolute transition-all ${isDark ? 'left-5' : 'left-1'}`}></span>
 </button>
 </div>
 </div>

 {/* Bahasa Dropdown */}
 <div className="w-full flex items-center justify-between p-3 bg-[var(--card)] shadow-sm rounded-2xl border border-[var(--border)] relative">
 <div className="flex items-center w-full">
 <div className="p-2 bg-[#FFF5F3] rounded-xl mr-4 shrink-0">
 <Globe className="w-5 h-5 text-[var(--primary)]" />
 </div>
 <span className="flex-1 text-left text-sm font-medium text-[var(--text)]">{t.language}</span>
 <div className="relative flex items-center shrink-0">
 <select
 value={language}
 onChange={handleChangeLanguage}
 className="bg-transparent text-sm text-[var(--muted)] font-medium appearance-none pr-6 outline-none cursor-pointer relative z-10"
 >
 <option value="ID" className="bg-[var(--card)] text-[var(--text)]">ID</option>
 <option value="EN" className="bg-[var(--card)] text-[var(--text)]">EN</option>
 </select>
 <ChevronRight className="w-4 h-4 text-[var(--muted)] absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
 </div>
 </div>
 </div>
 </div>

 {/* Logout Button */}
 <button
 onClick={handleLogout}
 className="w-full flex items-center justify-center p-3 rounded-2xl bg-[#FFF0F0] text-[#DC2626] font-semibold transition-colors border border-[#FFC5C5] hover:bg-[#FFE0E0] dark:bg-[#3D1010] dark:border-[var(--primary)] dark:hover:bg-[var(--primary)]"
 >
 <LogOut className="w-5 h-5 mr-2" />
 {t.logout}
 </button>

 </div>

 {/* Logout Bottom Sheet Modal */}
 {isLogoutModalOpen && (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-6" onClick={() => setIsLogoutModalOpen(false)}>
    <div className="w-full max-w-[350px] bg-white rounded-3xl px-6 py-8 flex flex-col items-center text-center z-50" onClick={(e) => e.stopPropagation()}>
      <div className="text-3xl mb-3">🚪</div>
      <h3 className="text-lg font-bold text-[#1F0A0A] mb-1">Keluar dari Akun?</h3>
      <p className="text-sm text-[#8A7070] mb-6">Kamu akan keluar dari Cetha AI</p>
      <button
        onClick={confirmLogout}
        className="w-full bg-[#6E1535] text-white py-3 rounded-2xl mb-3 text-sm font-medium active:scale-95 transition-transform"
      >
        Ya, Keluar
      </button>
      <button
        onClick={() => setIsLogoutModalOpen(false)}
        className="w-full bg-[#FFF5F3] text-[#6E1535] py-3 rounded-2xl text-sm font-medium border border-[#F5D5C8] active:scale-95 transition-transform"
      >
        Batal
      </button>
    </div>
  </div>
 )}

 <style jsx global>{`
 @keyframes slideUp {
 from { transform: translateY(100%); }
 to { transform: translateY(0); }
 }
 /* Opsional: Menyembunyikan scrollbar bawaan browser agar UI mulus */
 .scrollbar-none::-webkit-scrollbar {
 display: none;
 }
 .scrollbar-none {
 -ms-overflow-style: none;
 scrollbar-width: none;
 }
 `}</style>

 {/* Bottom Navigation */}
 <BottomNav />
 </div>
 </PageWrapper>
 );
}