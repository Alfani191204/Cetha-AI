"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simpan profil user ke localStorage sesuai permintaan
    localStorage.setItem(
      "cetha_user", 
      JSON.stringify({ nama: "Via Amanda", usaha: "Toko Sumber Rezeki" })
    );
    
    // Redirect ke halaman utama (Dashboard)
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-[430px] min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col items-center justify-center px-6 relative overflow-x-hidden font-sans">
      
      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-10 w-full">
        <img src="/icon-512x512.png" className="w-20 h-20 object-contain mx-auto mb-4"/>
        <h1 className="text-3xl font-extrabold text-[var(--primary)] tracking-tight mb-2">Cetha AI</h1>
        <p className="text-sm text-[var(--muted)] max-w-[250px] leading-relaxed">
          Asisten Keuangan Cerdas untuk UMKM
        </p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleLogin} className="w-full space-y-4">
        {/* Email Input */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-[var(--muted)] group-focus-within:text-[var(--primary)] transition-colors" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full pl-11 pr-4 py-3.5 bg-[var(--card)] border border-[var(--border)] rounded-2xl text-sm text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--primary)] focus:bg-[var(--card)] transition-all"
            placeholder="Alamat Email"
            required
          />
        </div>

        {/* Password Input */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-[var(--muted)] group-focus-within:text-[var(--primary)] transition-colors" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full pl-11 pr-12 py-3.5 bg-[var(--card)] border border-[var(--border)] rounded-2xl text-sm text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--primary)] focus:bg-[var(--card)] transition-all"
            placeholder="Kata Sandi"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-[var(--muted)] hover:text-[var(--text)] transition-colors" />
            ) : (
              <Eye className="h-5 w-5 text-[var(--muted)] hover:text-[var(--text)] transition-colors" />
            )}
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-[var(--primary)] hover:opacity-90 text-white font-semibold py-3.5 rounded-2xl transition-all shadow-sm active:scale-[0.98]"
        >
          Masuk
        </button>
      </form>

      {/* Divider */}
      <div className="w-full flex items-center py-6">
        <div className="flex-grow border-t border-[var(--border)]"></div>
        <span className="shrink-0 px-4 text-xs font-medium text-[var(--muted)] uppercase tracking-wider">
          atau
        </span>
        <div className="flex-grow border-t border-[var(--border)]"></div>
      </div>

      {/* Register Button */}
      <Link 
        href="/register" 
        className="w-full flex items-center justify-center bg-[var(--card)] border border-[var(--primary)] text-[var(--primary)] hover:bg-gray-50 font-semibold py-3.5 rounded-2xl transition-all active:scale-[0.98]"
      >
        Daftar Akun Baru
      </Link>
    </div>
  );
}
