"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Store, DollarSign, ChevronDown, CheckCircle2 } from "lucide-react";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Form states
  const [nama, setNama] = useState("");
  const [usaha, setUsaha] = useState("");
  const [jenis, setJenis] = useState("Kuliner");
  const [omzet, setOmzet] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleFinish = () => {
    // Tandai onboarding selesai
    localStorage.setItem("cetha_onboarded", "true");

    // Simpan data pendaftaran secara lokal jika belum ada atau untuk menimpa
    localStorage.setItem(
      "cetha_user",
      JSON.stringify({
        nama: nama || "Pemilik Usaha",
        usaha: usaha || "Bisnis UMKM"
      })
    );

    // Redirect ke dashboard
    router.push("/");
  };

  if (!mounted) return null;

  return (
    <div className="mx-auto max-w-[430px] min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col relative overflow-hidden font-sans">

      {/* Animasi Keyframes inline untuk checklist */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-checklist {
          opacity: 0;
          animation: fadeSlideIn 0.5s ease-out forwards;
        }
      `}} />

      {/* Progress Dots Indicator */}
      <div className="pt-12 pb-8 flex justify-center gap-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${step === i ? "w-8 bg-[var(--primary)]" :
                step > i ? "w-2 bg-[var(--border)]" : "w-2 bg-[var(--border)]"
              }`}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col px-6">
        {/* STEP 1 */}
        {step === 1 && (
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <img src="/icon-512x512.png" className="w-24 h-24 object-contain mx-auto mb-8" />

            <h1 className="text-2xl font-bold text-[var(--text)] mb-4 leading-tight">
              Halo, Selamat Datang!
            </h1>
            <p className="text-[var(--muted)] text-sm leading-relaxed max-w-[280px]">
              Cetha AI siap bantu kelola keuangan usahamu secara otomatis dan cerdas.
            </p>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-[var(--text)] mb-8 text-center">Cerita tentang usahamu</h2>

            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[var(--muted)] group-focus-within:text-[var(--primary)] transition-colors" />
                </div>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--primary)] focus:bg-[var(--card)] transition-all"
                  placeholder="Nama kamu"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Store className="h-5 w-5 text-[var(--muted)] group-focus-within:text-[var(--primary)] transition-colors" />
                </div>
                <input
                  type="text"
                  value={usaha}
                  onChange={(e) => setUsaha(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--primary)] focus:bg-[var(--card)] transition-all"
                  placeholder="Nama usaha"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <Store className="h-5 w-5 text-[var(--muted)] group-focus-within:text-[var(--primary)] transition-colors" />
                </div>
                <select
                  value={jenis}
                  onChange={(e) => setJenis(e.target.value)}
                  className="block w-full pl-11 pr-10 py-3.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] focus:outline-none focus:border-[var(--primary)] focus:bg-[var(--card)] transition-all appearance-none relative"
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

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-[var(--muted)] group-focus-within:text-[var(--primary)] transition-colors" />
                </div>
                <input
                  type="text"
                  value={omzet}
                  onChange={(e) => setOmzet(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--primary)] focus:bg-[var(--card)] transition-all"
                  placeholder="Omzet rata-rata per bulan (opsional)"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-center mb-8">
              <span className="text-[100px] inline-block drop-shadow-sm animate-bounce">🎉</span>
              <h2 className="text-2xl font-bold text-[var(--text)] mt-6">Semuanya siap!</h2>
            </div>

            <div className="space-y-4 bg-[var(--card)] p-6 rounded-2xl border border-[var(--border)] shadow-sm">
              <div className="flex items-center gap-3 animate-checklist" style={{ animationDelay: '0.1s' }}>
                <CheckCircle2 className="w-6 h-6 text-[var(--primary)] shrink-0" />
                <p className="text-sm text-[var(--muted)] font-medium">Profil usaha tersimpan</p>
              </div>
              <div className="flex items-center gap-3 animate-checklist" style={{ animationDelay: '0.3s' }}>
                <CheckCircle2 className="w-6 h-6 text-[var(--primary)] shrink-0" />
                <p className="text-sm text-[var(--muted)] font-medium">Dashboard siap digunakan</p>
              </div>
              <div className="flex items-center gap-3 animate-checklist" style={{ animationDelay: '0.5s' }}>
                <CheckCircle2 className="w-6 h-6 text-[var(--primary)] shrink-0" />
                <p className="text-sm text-[var(--muted)] font-medium">AI siap menganalisis keuanganmu</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Action */}
      <div className="p-6">
        {step < 3 ? (
          <button
            onClick={handleNext}
            className="w-full bg-[var(--primary)] hover:opacity-90 text-white font-semibold py-4 rounded-xl transition-all shadow-sm active:scale-[0.98] flex justify-center items-center gap-2"
          >
            {step === 1 ? "Mulai Setup" : "Lanjut"} &rarr;
          </button>
        ) : (
          <button
            onClick={handleFinish}
            className="w-full bg-[var(--primary)] hover:opacity-90 text-white font-semibold py-4 rounded-xl transition-all shadow-sm active:scale-[0.98] flex justify-center items-center gap-2"
          >
            Mulai Pakai Cetha AI
          </button>
        )}
      </div>
    </div>
  );
}
