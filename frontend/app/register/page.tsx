"use client";

import { useState } from "react";
import { ArrowLeft, User, Store, Mail, Lock, Eye, EyeOff, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [nama, setNama] = useState("");
  const [usaha, setUsaha] = useState("");
  const [jenis, setJenis] = useState("Kuliner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simpan data pendaftaran ke localStorage
    localStorage.setItem(
      "cetha_user", 
      JSON.stringify({ 
        nama: nama || "User Baru", 
        usaha: usaha || "Usaha Baru" 
      })
    );
    
    // Redirect ke dashboard
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-[430px] min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col px-6 relative overflow-x-hidden font-sans pb-10">
      
      {/* Header */}
      <header className="pt-10 pb-8 flex items-center">
        <Link href="/login" className="p-2 bg-[var(--card)] shadow-sm rounded-full hover:opacity-80 transition-opacity mr-4">
          <ArrowLeft className="w-5 h-5 text-[var(--text)]" />
        </Link>
        <h1 className="text-2xl font-bold text-[var(--text)] tracking-tight">Buat Akun Baru</h1>
      </header>

      {/* Form Section */}
      <form onSubmit={handleRegister} className="w-full space-y-4">
        
        {/* Nama Lengkap */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-[var(--muted)] group-focus-within:text-[var(--primary)] transition-colors" />
          </div>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="block w-full pl-11 pr-4 py-3.5 bg-[var(--card)] border border-[var(--border)] rounded-2xl text-sm text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--primary)] focus:bg-[var(--card)] transition-all"
            placeholder="Nama Lengkap"
            required
          />
        </div>

        {/* Nama Usaha */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Store className="h-5 w-5 text-[var(--muted)] group-focus-within:text-[var(--primary)] transition-colors" />
          </div>
          <input
            type="text"
            value={usaha}
            onChange={(e) => setUsaha(e.target.value)}
            className="block w-full pl-11 pr-4 py-3.5 bg-[var(--card)] border border-[var(--border)] rounded-2xl text-sm text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--primary)] focus:bg-[var(--card)] transition-all"
            placeholder="Nama Usaha"
            required
          />
        </div>

        {/* Jenis Usaha Dropdown */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <Store className="h-5 w-5 text-[var(--muted)] group-focus-within:text-[var(--primary)] transition-colors" />
          </div>
          <select
            value={jenis}
            onChange={(e) => setJenis(e.target.value)}
            className="block w-full pl-11 pr-10 py-3.5 bg-[var(--card)] border border-[var(--border)] rounded-2xl text-sm text-[var(--text)] focus:outline-none focus:border-[var(--primary)] focus:bg-[var(--card)] transition-all appearance-none relative"
            required
          >
            <option value="Kuliner" className="bg-[var(--card)] text-[var(--text)]">Kuliner</option>
            <option value="Fashion" className="bg-[var(--card)] text-[var(--text)]">Fashion</option>
            <option value="Sembako" className="bg-[var(--card)] text-[var(--text)]">Sembako</option>
            <option value="Jasa" className="bg-[var(--card)] text-[var(--text)]">Jasa</option>
            <option value="Lainnya" className="bg-[var(--card)] text-[var(--text)]">Lainnya</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <ChevronDown className="h-4 w-4 text-[var(--muted)]" />
          </div>
        </div>

        {/* Email */}
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

        {/* Confirm Password Input */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-[var(--muted)] group-focus-within:text-[var(--primary)] transition-colors" />
          </div>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full pl-11 pr-12 py-3.5 bg-[var(--card)] border border-[var(--border)] rounded-2xl text-sm text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--primary)] focus:bg-[var(--card)] transition-all"
            placeholder="Konfirmasi Kata Sandi"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-[var(--muted)] hover:text-[var(--text)] transition-colors" />
            ) : (
              <Eye className="h-5 w-5 text-[var(--muted)] hover:text-[var(--text)] transition-colors" />
            )}
          </button>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full !mt-8 bg-[var(--primary)] hover:opacity-90 text-white font-semibold py-3.5 rounded-2xl transition-all shadow-sm active:scale-[0.98]"
        >
          Daftar Sekarang
        </button>
      </form>

      {/* Link to Login */}
      <div className="mt-8 text-center">
        <p className="text-sm text-[var(--muted)]">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-[var(--primary)] font-semibold hover:opacity-80 transition-opacity">
            Masuk
          </Link>
        </p>
      </div>

    </div>
  );
}
